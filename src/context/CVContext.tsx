import {
  createContext,
  useContext,
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

type CVContextValue = {
  cv: CVData
  cvRef: React.MutableRefObject<HTMLDivElement | null>
  updatePersonal: (field: keyof CVData['personal'], value: string) => void
  updateProfile: (value: string) => void
  updateSkills: (skills: SkillCategory[]) => void
  updateExperiences: (experiences: Experience[]) => void
  updateEducations: (educations: Education[]) => void
  updateCertifications: (certifications: Certification[]) => void
  updateLanguages: (languages: Language[]) => void
  updatePublication: (field: keyof CVData['publication'], value: string) => void
  updateHobbies: (value: string) => void
  updatePhoto: (file: File) => void
  downloadPdf: () => void
}

const CVContext = createContext<CVContextValue | null>(null)

export function CVProvider({ children }: { children: ReactNode }) {
  const [cv, setCv] = useState<CVData>(defaultCV)
  const cvRef = useRef<HTMLDivElement | null>(null)

  function updatePersonal(field: keyof CVData['personal'], value: string) {
    setCv(current => ({
      ...current,
      personal: { ...current.personal, [field]: value },
    }))
  }

  function updateProfile(value: string) {
    setCv(current => ({ ...current, profile: value }))
  }

  function updateSkills(skills: SkillCategory[]) {
    setCv(current => ({ ...current, skills }))
  }

  function updateExperiences(experiences: Experience[]) {
    setCv(current => ({ ...current, experiences }))
  }

  function updateEducations(educations: Education[]) {
    setCv(current => ({ ...current, educations }))
  }

  function updateCertifications(certifications: Certification[]) {
    setCv(current => ({ ...current, certifications }))
  }

  function updateLanguages(languages: Language[]) {
    setCv(current => ({ ...current, languages }))
  }

  function updatePublication(field: keyof CVData['publication'], value: string) {
    setCv(current => ({
      ...current,
      publication: { ...current.publication, [field]: value },
    }))
  }

  function updateHobbies(value: string) {
    setCv(current => ({ ...current, hobbies: value }))
  }

  function updatePhoto(file: File) {
    const reader = new FileReader()

    reader.onload = () => {
      setCv(current => ({
        ...current,
        personal: {
          ...current.personal,
          photo: reader.result as string,
        },
      }))
    }

    reader.readAsDataURL(file)
  }

  function downloadPdf() {
    if (!cvRef.current) return

    const filename = `${cv.personal.name.replace(/\s+/g, '_')}_CV.pdf`
    downloadCVPdf(cvRef.current, filename)
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
      }}
    >
      {children}
    </CVContext.Provider>
  )
}

export function useCV() {
  const context = useContext(CVContext)

  if (!context) {
    throw new Error('useCV must be used inside CVProvider')
  }

  return context
}
