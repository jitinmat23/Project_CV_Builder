import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
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

const STORAGE_KEY = 'cv-builder-data-v1'

type CVContextValue = {
  cv: CVData

  cvRef: React.MutableRefObject<HTMLDivElement | null>

  updatePersonal: (
    field: keyof CVData['personal'],
    value: string
  ) => void

  updateProfile: (
    value: string
  ) => void

  updateSkills: (
    skills: SkillCategory[]
  ) => void

  updateExperiences: (
    experiences: Experience[]
  ) => void

  updateEducations: (
    educations: Education[]
  ) => void

  updateCertifications: (
    certifications: Certification[]
  ) => void

  updateLanguages: (
    languages: Language[]
  ) => void

  updatePublication: (
    field: keyof CVData['publication'],
    value: string
  ) => void

  updateHobbies: (
    value: string
  ) => void

  updatePhoto: (
    file: File
  ) => void

  downloadPdf: () => void

  resetCV: () => void
}

const CVContext =
  createContext<CVContextValue | null>(null)

function loadSavedCV(): CVData {
  try {
    const saved =
      localStorage.getItem(
        STORAGE_KEY
      )

    if (!saved) {
      return defaultCV
    }

    const parsed =
      JSON.parse(saved)

    return {
      ...defaultCV,
      ...parsed,

      personal: {
        ...defaultCV.personal,
        ...(parsed.personal || {}),
      },

      skills:
        parsed.skills ||
        defaultCV.skills,

      experiences:
        parsed.experiences ||
        defaultCV.experiences,

      educations:
        parsed.educations ||
        defaultCV.educations,

      certifications:
        parsed.certifications ||
        defaultCV.certifications,

      languages:
        parsed.languages ||
        defaultCV.languages,

      publication: {
        ...defaultCV.publication,
        ...(parsed.publication || {}),
      },

      hobbies:
        parsed.hobbies ??
        defaultCV.hobbies,
    }
  } catch (error) {
    console.error(
      'Could not load saved CV:',
      error
    )

    return defaultCV
  }
}

export function CVProvider({
  children,
}: {
  children: ReactNode
}) {

  /*
   * Load the saved CV when the application starts.
   *
   * If there is no saved CV, the default CV
   * from defaultCV.ts is used.
   */

  const [cv, setCv] =
    useState<CVData>(
      loadSavedCV
    )

  const cvRef =
    useRef<HTMLDivElement | null>(
      null
    )

  /*
   * AUTO SAVE
   *
   * Every time CV data changes,
   * save it to localStorage.
   */

  useEffect(() => {

    try {

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(cv)
      )

    } catch (error) {

      console.error(
        'Could not save CV:',
        error
      )

    }

  }, [cv])

  /*
   * PERSONAL INFORMATION
   */

  function updatePersonal(
    field:
      keyof CVData['personal'],
    value: string
  ) {

    setCv(current => ({

      ...current,

      personal: {

        ...current.personal,

        [field]: value,

      },

    }))

  }

  /*
   * PROFILE
   */

  function updateProfile(
    value: string
  ) {

    setCv(current => ({

      ...current,

      profile: value,

    }))

  }

  /*
   * SKILLS
   */

  function updateSkills(
    skills: SkillCategory[]
  ) {

    setCv(current => ({

      ...current,

      skills,

    }))

  }

  /*
   * EXPERIENCE
   */

  function updateExperiences(
    experiences: Experience[]
  ) {

    setCv(current => ({

      ...current,

      experiences,

    }))

  }

  /*
   * EDUCATION
   */

  function updateEducations(
    educations: Education[]
  ) {

    setCv(current => ({

      ...current,

      educations,

    }))

  }

  /*
   * CERTIFICATIONS
   */

  function updateCertifications(
    certifications:
      Certification[]
  ) {

    setCv(current => ({

      ...current,

      certifications,

    }))

  }

  /*
   * LANGUAGES
   */

  function updateLanguages(
    languages: Language[]
  ) {

    setCv(current => ({

      ...current,

      languages,

    }))

  }

  /*
   * PUBLICATION
   */

  function updatePublication(
    field:
      keyof CVData['publication'],
    value: string
  ) {

    setCv(current => ({

      ...current,

      publication: {

        ...current.publication,

        [field]: value,

      },

    }))

  }

  /*
   * HOBBIES
   */

  function updateHobbies(
    value: string
  ) {

    setCv(current => ({

      ...current,

      hobbies: value,

    }))

  }

  /*
   * PHOTO
   */

  function updatePhoto(
    file: File
  ) {

    const reader =
      new FileReader()

    reader.onload = () => {

      setCv(current => ({

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

  /*
   * DOWNLOAD PDF
   */

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

  /*
   * RESET CV
   *
   * This removes the saved CV and
   * returns the application to the
   * original default CV.
   */

  function resetCV() {

    const confirmed =
      window.confirm(
        'Are you sure you want to reset your CV to the default data? All your current browser-saved changes will be removed.'
      )

    if (!confirmed) {
      return
    }

    localStorage.removeItem(
      STORAGE_KEY
    )

    setCv(defaultCV)

  }

  return (

    <CVContext.Provider
      value={{

        cv,

        cvRef,

        updatePersonal,

        updateProfile,

        updateSkills,

        updateExperiences,

        updateEducations,

        updateCertifications,

        updateLanguages,

        updatePublication,

        updateHobbies,

        updatePhoto,

        downloadPdf,

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