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
import CustomSectionView from './CustomSectionView'

export default function CVPreview() {
  const { cvRef, template, sectionVisibility, cv } = useCV()

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
                {sectionVisibility.education && <EducationSection />}
                {sectionVisibility.certifications && <CertificationSection />}
                {sectionVisibility.languages && <LanguageSection />}
                {sectionVisibility.publication && <PublicationSection />}
                {sectionVisibility.interests && <HobbiesSection />}

                {cv.customSections
                  .filter(section => section.visible && section.position === 'sidebar')
                  .sort((a, b) => a.order - b.order)
                  .map(section => (
                    <CustomSectionView
                      key={section.id}
                      section={section}
                    />
                  ))}
              </aside>

              <main className="cv-main">
                {sectionVisibility.profile && <ProfileSection />}
                {sectionVisibility.skills && <SkillsSection />}
                {sectionVisibility.experience && <ExperienceSection />}

                {cv.customSections
                  .filter(section => section.visible && section.position === 'main')
                  .sort((a, b) => a.order - b.order)
                  .map(section => (
                    <CustomSectionView
                      key={section.id}
                      section={section}
                    />
                  ))}
              </main>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
