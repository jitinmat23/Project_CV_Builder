export type Experience = {
  position: string
  company: string
  dates: string
  description: string[]
}

export type Education = {
  degree: string
  institution: string
  dates: string
  grade: string
}

export type Certification = {
  name: string
  url: string
}

export type Language = {
  name: string
  level: string
}

export type SkillCategory = {
  category: string
  skills: string
}

export type PersonalInfo = {
  name: string
  jobTitle: string
  email: string
  phone: string
  location: string
  nationality: string
  drivingLicence: string
  birthday: string
  linkedin: string
  linkedinUrl: string
  xing: string
  xingUrl: string
  github: string
  githubUrl: string
  photo: string
}

export type Publication = {
  name: string
  url: string
}

export type CVSectionKey =
  | 'profile'
  | 'skills'
  | 'experience'
  | 'education'
  | 'certifications'
  | 'languages'
  | 'publication'
  | 'interests'

export type CVSectionVisibility = Record<CVSectionKey, boolean>

export type CustomSectionPosition = 'main' | 'sidebar'

export type CustomSection = {
  id: string
  title: string
  content: string
  visible: boolean
  position: CustomSectionPosition
  order: number
}

export type CVData = {
  personal: PersonalInfo
  profile: string
  skills: SkillCategory[]
  experiences: Experience[]
  educations: Education[]
  certifications: Certification[]
  languages: Language[]
  publication: Publication
  hobbies: string
  customSections: CustomSection[]
}
