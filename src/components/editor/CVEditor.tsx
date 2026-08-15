import EditorSection from './EditorSection'
import PersonalInfoEditor from './PersonalInfoEditor'
import ProfileEditor from './ProfileEditor'
import SkillsEditor from './SkillsEditor'
import ExperienceEditor from './ExperienceEditor'
import EducationEditor from './EducationEditor'
import CertificationEditor from './CertificationEditor'
import LanguagesEditor from './LanguagesEditor'
import PublicationEditor from './PublicationEditor'
import HobbiesEditor from './HobbiesEditor'
import ProfileManager from './ProfileManager'
import TemplateSelector from './TemplateSelector'
import SectionVisibilityEditor from './SectionVisibilityEditor'
import CustomSectionsEditor from './CustomSectionsEditor'
import { useCV } from '../../context/CVContext'

export default function CVEditor() {
  const { downloadPdf } = useCV()

  return (
    <div className="editor">

      <div className="editor-header">

        <h1>CV Builder</h1>

        <p>
          Edit the information below.
          The CV preview updates automatically.
        </p>

        <button
          className="download-button"
          onClick={downloadPdf}
        >
          Download PDF
        </button>

      </div>

      <ProfileManager />

      <TemplateSelector />

      <SectionVisibilityEditor />

      <CustomSectionsEditor />

      <EditorSection title="Personal Information">
        <PersonalInfoEditor />
      </EditorSection>

      <EditorSection title="Profile">
        <ProfileEditor />
      </EditorSection>

      <EditorSection title="Professional Skills">
        <SkillsEditor />
      </EditorSection>

      <EditorSection title="Work Experience">
        <ExperienceEditor />
      </EditorSection>

      <EditorSection title="Education">
        <EducationEditor />
      </EditorSection>

      <EditorSection title="Certifications">
        <CertificationEditor />
      </EditorSection>

      <EditorSection title="Languages">
        <LanguagesEditor />
      </EditorSection>

      <EditorSection title="Publication">
        <PublicationEditor />
      </EditorSection>

      <EditorSection title="Hobbies">
        <HobbiesEditor />
      </EditorSection>

    </div>
  )
}
