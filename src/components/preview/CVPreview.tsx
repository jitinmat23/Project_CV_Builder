import { useCV } from '../../context/CVContext'
import CVHeader from './CVHeader'
import ContactSection from './ContactSection'
import EducationSection from './EducationSection'
import CertificationSection from './CertificationSection'
import LanguageSection from './LanguageSection'
import PublicationSection from './PublicationSection'
import HobbiesSection from './HobbiesSection'
import ProfileSection from './ProfileSection'
import SkillsSection from './SkillsSection'
import ExperienceSection from './ExperienceSection'
import ATSPreview from './ATSPreview'

export default function CVPreview() {
  const { cvRef, template } = useCV()

  return (
    <div className="preview">
      <div
        className={`cv ${
          template === 'ats' ? 'cv-ats' : 'cv-professional'
        }`}
        ref={cvRef}
      >
        {template === 'ats' ? (
          <ATSPreview />
        ) : (
          <>
            <CVHeader />

            <div className="cv-content">
              <aside className="cv-sidebar">
                <ContactSection />
                <EducationSection />
                <CertificationSection />
                <LanguageSection />
                <PublicationSection />
                <HobbiesSection />
              </aside>

              <main className="cv-main">
                <ProfileSection />
                <SkillsSection />
                <ExperienceSection />
              </main>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
