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
import { useCV } from '../../context/CVContext'

export default function CVEditor() {
  const { downloadPdf } = useCV()

  return (
    <div className="editor">
      <div className="editor-header">
        <h1>CV Builder</h1>
        <p>
          Edit the information below. The CV preview updates automatically.
        </p>
        <button className="download-button" onClick={downloadPdf}>
          Download PDF
        </button>
      </div>

      <EditorSection title="Personal Information">
        <PersonalInfoEditor />
      </EditorSection>

      <EditorSection title="Profile">
        <ProfileEditor />
      </EditorSection>

      <EditorSection
        title="Professional Skills"
        action={
          <span className="section-action-label">
            Edit below
          </span>
        }
      >
        <SkillsEditor />
      </EditorSection>

      <EditorSection
        title="Work Experience"
        action={
          <span className="section-action-label">
            Edit below
          </span>
        }
      >
        <ExperienceEditor />
      </EditorSection>

      <EditorSection
        title="Education"
        action={
          <span className="section-action-label">
            Edit below
          </span>
        }
      >
        <EducationEditor />
      </EditorSection>

      <EditorSection
        title="Certifications"
        action={
          <span className="section-action-label">
            Edit below
          </span>
        }
      >
        <CertificationEditor />
      </EditorSection>

      <EditorSection
        title="Languages"
        action={
          <span className="section-action-label">
            Edit below
          </span>
        }
      >
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
