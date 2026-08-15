import { useCV } from '../../context/CVContext'
import type { CustomSectionPosition } from '../../types/cv'

export default function CustomSectionsEditor() {
  const {
    cv,
    addCustomSection,
    updateCustomSection,
    deleteCustomSection,
    moveCustomSectionUp,
    moveCustomSectionDown,
  } = useCV()

  const sections = [...(cv.customSections || [])].sort(
    (a, b) => a.order - b.order
  )

  return (
    <section className="custom-sections-editor">
      <div className="custom-sections-header">
        <div>
          <h2>CUSTOM SECTIONS</h2>
          <p>
            Add sections such as Projects, Awards, Achievements,
            Volunteering or any other information.
          </p>
        </div>

        <button
          type="button"
          className="custom-add-button"
          onClick={() => addCustomSection()}
        >
          + Add Section
        </button>
      </div>

      {sections.length === 0 ? (
        <div className="custom-empty">
          No custom sections yet.
        </div>
      ) : (
        <div className="custom-section-list">
          {sections.map((section, index) => (
            <article className="custom-section-card" key={section.id}>
              <div className="custom-section-card-top">
                <div className="custom-order-buttons">
                  <button
                    type="button"
                    className="custom-move-button"
                    disabled={index === 0}
                    onClick={() => moveCustomSectionUp(section.id)}
                    aria-label="Move section up"
                  >
                    ↑
                  </button>

                  <button
                    type="button"
                    className="custom-move-button"
                    disabled={index === sections.length - 1}
                    onClick={() => moveCustomSectionDown(section.id)}
                    aria-label="Move section down"
                  >
                    ↓
                  </button>
                </div>

                <label className="custom-visible-toggle">
                  <input
                    type="checkbox"
                    checked={section.visible}
                    onChange={event =>
                      updateCustomSection(
                        section.id,
                        'visible',
                        event.target.checked
                      )
                    }
                  />
                  <span>Visible</span>
                </label>

                <button
                  type="button"
                  className="custom-delete-button"
                  onClick={() => deleteCustomSection(section.id)}
                >
                  Delete
                </button>
              </div>

              <label className="custom-field">
                <span>Section title</span>
                <input
                  type="text"
                  value={section.title}
                  placeholder="e.g. Awards & Achievements"
                  onChange={event =>
                    updateCustomSection(
                      section.id,
                      'title',
                      event.target.value
                    )
                  }
                />
              </label>

              <label className="custom-field">
                <span>Content</span>
                <textarea
                  rows={5}
                  value={section.content}
                  placeholder={
                    'Enter your content here. You can use separate lines for separate points.'
                  }
                  onChange={event =>
                    updateCustomSection(
                      section.id,
                      'content',
                      event.target.value
                    )
                  }
                />
              </label>

              <label className="custom-field">
                <span>Professional template position</span>
                <select
                  value={section.position}
                  onChange={event =>
                    updateCustomSection(
                      section.id,
                      'position',
                      event.target.value as CustomSectionPosition
                    )
                  }
                >
                  <option value="main">Main Content</option>
                  <option value="sidebar">Left Sidebar</option>
                </select>
              </label>

              <p className="custom-position-help">
                ATS always places custom sections in the main content
                because it uses a single-column layout.
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
