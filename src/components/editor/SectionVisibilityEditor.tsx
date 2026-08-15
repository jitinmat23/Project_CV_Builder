import { useCV } from '../../context/CVContext'
import type { CVSectionKey } from '../../types/cv'

type SectionItem = { key: CVSectionKey; label: string }

const sections: SectionItem[] = [
  { key: 'profile', label: 'Profile' },
  { key: 'skills', label: 'Professional Skills' },
  { key: 'experience', label: 'Work Experience' },
  { key: 'education', label: 'Education' },
  { key: 'certifications', label: 'Certifications' },
  { key: 'languages', label: 'Languages' },
  { key: 'publication', label: 'Publication' },
  { key: 'interests', label: 'Hobbies / Interests' },
]

export default function SectionVisibilityEditor() {
  const { sectionVisibility, setSectionVisibility } = useCV()

  return (
    <section className="section-visibility">
      <div className="section-visibility-header">
        <h2>CV SECTIONS</h2>
        <p>Choose which sections appear in the generated CV. Your content is kept even when a section is hidden.</p>
      </div>

      <div className="section-visibility-list">
        {sections.map(section => (
          <label className="section-visibility-item" key={section.key}>
            <input
              type="checkbox"
              checked={sectionVisibility[section.key]}
              onChange={event => setSectionVisibility(section.key, event.target.checked)}
            />
            <span className="section-visibility-check" aria-hidden="true">
              {sectionVisibility[section.key] ? '✓' : ''}
            </span>
            <span className="section-visibility-label">{section.label}</span>
          </label>
        ))}
      </div>
    </section>
  )
}
