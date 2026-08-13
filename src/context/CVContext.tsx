import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from 'react'

import { defaultCV } from '../data/defaultCV'
import type {
  Certification,
  CVData,
  Education,
  Experience,
  Language,
  SkillCategory,
} from '../types/cv'
import { downloadCVPdf } from '../utils/pdf'

const PROFILES_STORAGE_KEY = 'cv-builder-profiles-v1'
const OLD_CV_STORAGE_KEY = 'cv-builder-data-v1'

export type CVProfile = {
  id: string
  name: string
  cv: CVData
}

type CVContextValue = {
  cv: CVData
  cvRef: MutableRefObject<HTMLDivElement | null>

  profiles: CVProfile[]
  activeProfileId: string

  updatePersonal: (
    field: keyof CVData['personal'],
    value: string
  ) => void

  updateProfile: (value: string) => void
  updateSkills: (skills: SkillCategory[]) => void
  updateExperiences: (experiences: Experience[]) => void
  moveExperienceUp: (index: number) => void
  moveExperienceDown: (index: number) => void
  updateEducations: (educations: Education[]) => void
  moveEducationUp: (index: number) => void
  moveEducationDown: (index: number) => void
  updateCertifications: (certifications: Certification[]) => void
  updateLanguages: (languages: Language[]) => void

  updatePublication: (
    field: keyof CVData['publication'],
    value: string
  ) => void

  updateHobbies: (value: string) => void
  updatePhoto: (file: File) => void
  downloadPdf: () => void

  createProfile: (name?: string) => void
  duplicateProfile: (
    profileId: string
  ) => void
  renameProfile: (
    profileId: string,
    name: string
  ) => void
  deleteProfile: (
    profileId: string
  ) => void
  selectProfile: (
    profileId: string
  ) => void

  resetCV: () => void
}

const CVContext =
  createContext<CVContextValue | null>(null)

function cloneCV(cv: CVData): CVData {
  return JSON.parse(
    JSON.stringify(cv)
  ) as CVData
}

function createId(): string {
  return `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 9)}`
}

function createDefaultProfile(): CVProfile {
  return {
    id: createId(),
    name: 'Software Test Engineer',
    cv: cloneCV(defaultCV),
  }
}

function loadInitialProfiles(): {
  profiles: CVProfile[]
  activeProfileId: string
} {
  try {
    const savedProfiles =
      localStorage.getItem(
        PROFILES_STORAGE_KEY
      )

    if (savedProfiles) {
      const parsed =
        JSON.parse(savedProfiles)

      if (
        Array.isArray(parsed.profiles) &&
        parsed.profiles.length > 0
      ) {
        return {
          profiles: parsed.profiles,
          activeProfileId:
            parsed.activeProfileId ||
            parsed.profiles[0].id,
        }
      }
    }

    /*
     * Migration from the previous
     * single-CV localStorage version.
     */

    const oldCV =
      localStorage.getItem(
        OLD_CV_STORAGE_KEY
      )

    if (oldCV) {
      const parsedCV =
        JSON.parse(oldCV) as CVData

      const profile: CVProfile = {
        id: createId(),
        name:
          parsedCV.personal?.jobTitle ||
          'My CV',
        cv: {
          ...cloneCV(defaultCV),
          ...parsedCV,
          personal: {
            ...cloneCV(
              defaultCV
            ).personal,
            ...(parsedCV.personal || {}),
          },
        },
      }

      return {
        profiles: [profile],
        activeProfileId: profile.id,
      }
    }

    const profile =
      createDefaultProfile()

    return {
      profiles: [profile],
      activeProfileId: profile.id,
    }
  } catch (error) {
    console.error(
      'Could not load CV profiles:',
      error
    )

    const profile =
      createDefaultProfile()

    return {
      profiles: [profile],
      activeProfileId: profile.id,
    }
  }
}

export function CVProvider({
  children,
}: {
  children: ReactNode
}) {
  const initial =
    useRef(loadInitialProfiles())

  const [profiles, setProfiles] =
    useState<CVProfile[]>(
      initial.current.profiles
    )

  const [
    activeProfileId,
    setActiveProfileId,
  ] = useState<string>(
    initial.current.activeProfileId
  )

  const cvRef =
    useRef<HTMLDivElement | null>(
      null
    )

  const activeProfile =
    profiles.find(
      profile =>
        profile.id ===
        activeProfileId
    ) || profiles[0]

  const cv =
    activeProfile?.cv ||
    defaultCV

  /*
   * AUTO SAVE ALL PROFILES
   */

  useEffect(() => {
    try {
      localStorage.setItem(
        PROFILES_STORAGE_KEY,
        JSON.stringify({
          profiles,
          activeProfileId,
        })
      )
    } catch (error) {
      console.error(
        'Could not save CV profiles:',
        error
      )
    }
  }, [
    profiles,
    activeProfileId,
  ])

  function updateCurrentCV(
    updater: (
      current: CVData
    ) => CVData
  ) {
    setProfiles(currentProfiles =>
      currentProfiles.map(
        profile =>
          profile.id ===
          activeProfileId
            ? {
                ...profile,
                cv: updater(
                  profile.cv
                ),
              }
            : profile
      )
    )
  }

  function updatePersonal(
    field:
      keyof CVData['personal'],
    value: string
  ) {
    updateCurrentCV(current => ({
      ...current,
      personal: {
        ...current.personal,
        [field]: value,
      },
    }))
  }

  function updateProfile(
    value: string
  ) {
    updateCurrentCV(current => ({
      ...current,
      profile: value,
    }))
  }

  function updateSkills(
    skills: SkillCategory[]
  ) {
    updateCurrentCV(current => ({
      ...current,
      skills,
    }))
  }

  function updateExperiences(
    experiences: Experience[]
  ) {
    updateCurrentCV(current => ({
      ...current,
      experiences,
    }))
  }

  function moveExperienceUp(index: number) {
    if (
      index <= 0 ||
      index >= cv.experiences.length
    ) {
      return
    }

    const experiences = [...cv.experiences]

    ;[experiences[index - 1], experiences[index]] = [
      experiences[index],
      experiences[index - 1],
    ]

    updateExperiences(experiences)
  }

  function moveExperienceDown(index: number) {
    if (
      index < 0 ||
      index >= cv.experiences.length - 1
    ) {
      return
    }

    const experiences = [...cv.experiences]

    ;[experiences[index], experiences[index + 1]] = [
      experiences[index + 1],
      experiences[index],
    ]

    updateExperiences(experiences)
  }

  function updateEducations(
    educations: Education[]
  ) {
    updateCurrentCV(current => ({
      ...current,
      educations,
    }))
  }

  function moveEducationUp(index: number) {
    if (
      index <= 0 ||
      index >= cv.educations.length
    ) {
      return
    }

    const educations = [...cv.educations]

    ;[educations[index - 1], educations[index]] = [
      educations[index],
      educations[index - 1],
    ]

    updateEducations(educations)
  }

  function moveEducationDown(index: number) {
    if (
      index < 0 ||
      index >= cv.educations.length - 1
    ) {
      return
    }

    const educations = [...cv.educations]

    ;[educations[index], educations[index + 1]] = [
      educations[index + 1],
      educations[index],
    ]

    updateEducations(educations)
  }

  function updateCertifications(
    certifications: Certification[]
  ) {
    updateCurrentCV(current => ({
      ...current,
      certifications,
    }))
  }

  function updateLanguages(
    languages: Language[]
  ) {
    updateCurrentCV(current => ({
      ...current,
      languages,
    }))
  }

  function updatePublication(
    field:
      keyof CVData['publication'],
    value: string
  ) {
    updateCurrentCV(current => ({
      ...current,
      publication: {
        ...current.publication,
        [field]: value,
      },
    }))
  }

  function updateHobbies(
    value: string
  ) {
    updateCurrentCV(current => ({
      ...current,
      hobbies: value,
    }))
  }

  function updatePhoto(
    file: File
  ) {
    const reader =
      new FileReader()

    reader.onload = () => {
      updateCurrentCV(current => ({
        ...current,
        personal: {
          ...current.personal,
          photo:
            reader.result as string,
        },
      }))
    }

    reader.readAsDataURL(file)
  }

  function downloadPdf() {
    if (!cvRef.current) {
      return
    }

    const filename =
      `${cv.personal.name.replace(
        /\s+/g,
        '_'
      )}_CV.pdf`

    downloadCVPdf(
      cvRef.current,
      filename
    )
  }

  function createProfile(
    name = 'New CV'
  ) {
    const profile: CVProfile = {
      id: createId(),
      name,
      cv: cloneCV(defaultCV),
    }

    setProfiles(current => [
      ...current,
      profile,
    ])

    setActiveProfileId(
      profile.id
    )
  }

  function duplicateProfile(
    profileId: string
  ) {
    const source =
      profiles.find(
        profile =>
          profile.id ===
          profileId
      )

    if (!source) {
      return
    }

    const duplicate: CVProfile = {
      id: createId(),
      name: `${source.name} Copy`,
      cv: cloneCV(
        source.cv
      ),
    }

    setProfiles(current => {
      const index =
        current.findIndex(
          profile =>
            profile.id ===
            profileId
        )

      const next = [
        ...current,
      ]

      next.splice(
        index + 1,
        0,
        duplicate
      )

      return next
    })

    setActiveProfileId(
      duplicate.id
    )
  }

  function renameProfile(
    profileId: string,
    name: string
  ) {
    const trimmed =
      name.trim()

    if (!trimmed) {
      return
    }

    setProfiles(current =>
      current.map(profile =>
        profile.id ===
        profileId
          ? {
              ...profile,
              name: trimmed,
            }
          : profile
      )
    )
  }

  function deleteProfile(
    profileId: string
  ) {
    if (profiles.length <= 1) {
      window.alert(
        'You must keep at least one CV profile.'
      )
      return
    }

    const profile =
      profiles.find(
        item =>
          item.id ===
          profileId
      )

    if (!profile) {
      return
    }

    const confirmed =
      window.confirm(
        `Delete "${profile.name}"? This CV cannot be recovered.`
      )

    if (!confirmed) {
      return
    }

    const remaining =
      profiles.filter(
        item =>
          item.id !==
          profileId
      )

    setProfiles(remaining)

    if (
      profileId ===
      activeProfileId
    ) {
      setActiveProfileId(
        remaining[0].id
      )
    }
  }

  function selectProfile(
    profileId: string
  ) {
    const exists =
      profiles.some(
        profile =>
          profile.id ===
          profileId
      )

    if (exists) {
      setActiveProfileId(
        profileId
      )
    }
  }

  function resetCV() {
    const confirmed =
      window.confirm(
        'Reset this CV to the default data? Your changes in this profile will be removed.'
      )

    if (!confirmed) {
      return
    }

    updateCurrentCV(() =>
      cloneCV(defaultCV)
    )
  }

  return (
    <CVContext.Provider
      value={{
        cv,
        cvRef,

        profiles,
        activeProfileId,

        updatePersonal,
        updateProfile,
        updateSkills,
        updateExperiences,
        moveExperienceUp,
        moveExperienceDown,
        updateEducations,
        moveEducationUp,
        moveEducationDown,
        updateCertifications,
        updateLanguages,
        updatePublication,
        updateHobbies,
        updatePhoto,
        downloadPdf,

        createProfile,
        duplicateProfile,
        renameProfile,
        deleteProfile,
        selectProfile,

        resetCV,
      }}
    >
      {children}
    </CVContext.Provider>
  )
}

export function useCV() {
  const context =
    useContext(CVContext)

  if (!context) {
    throw new Error(
      'useCV must be used inside CVProvider'
    )
  }

  return context
}
