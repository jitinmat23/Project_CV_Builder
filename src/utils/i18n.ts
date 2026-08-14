export type CVLanguage = 'en' | 'de'

export const cvLabels = {
  en: {
    contact: 'CONTACT',
    profile: 'PROFILE',
    skills: 'SKILLS',
    professionalSkills: 'PROFESSIONAL SKILLS',
    workExperience: 'WORK EXPERIENCE',
    education: 'EDUCATION',
    certifications: 'CERTIFICATIONS',
    languages: 'LANGUAGES',
    languageSkills: 'LANGUAGE SKILLS',
    publications: 'PUBLICATIONS',
    interests: 'HOBBIES',
    nationality: 'Nationality',
    grade: 'Grade',
  },
  de: {
    contact: 'KONTAKT',
    profile: 'PROFIL',
    skills: 'FACHLICHE KOMPETENZEN',
    professionalSkills: 'FACHLICHE KOMPETENZEN',
    workExperience: 'BERUFSERFAHRUNG',
    education: 'AUSBILDUNG',
    certifications: 'ZERTIFIKATE',
    languages: 'SPRACHKENNTNISSE',
    languageSkills: 'SPRACHKENNTNISSE',
    publications: 'PUBLIKATIONEN',
    interests: 'INTERESSEN',
    nationality: 'Staatsangehörigkeit',
    grade: 'Note',
  },
} as const
