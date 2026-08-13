import { useCV } from '../../context/CVContext'
import type { Experience } from '../../types/cv'

export default function ExperienceEditor() {
  const {
    cv,
    updateExperiences,
    moveExperienceUp,
    moveExperienceDown,
  } = useCV()

  function add() {
    updateExperiences([
      ...cv.experiences,
      {
        position: 'New Position',
        company: 'Company',
        dates: '',
        description: ['New responsibility'],
      },
    ])
  }

  function update(
    index: number,
    field: keyof Experience,
    value: string
  ) {
    const next = [...cv.experiences]

    next[index] =
      field === 'description'
        ? { ...next[index], description: value.split('\n') }
        : { ...next[index], [field]: value }

    updateExperiences(next)
  }

  function remove(index: number) {
    updateExperiences(cv.experiences.filter((_, i) => i !== index))
  }

  return (
    <div>
      {cv.experiences.map((experience, index) => {
        const isFirst = index === 0
        const isLast = index === cv.experiences.length - 1

        return (
          <details className="editor-item" key={index} open={index === 0}>
            <summary>
              <div className="item-summary">
                <span className="item-number">{index + 1}</span>
                <div>
                  <strong>{experience.position || 'New Position'}</strong>
                  <span>{experience.company || 'Company'}</span>
                  <small>{experience.dates}</small>
                </div>
              </div>
            </summary>

            <div className="item-body">
              <label>
                Position
                <input
                  value={experience.position}
                  onChange={e => update(index, 'position', e.target.value)}
                />
              </label>

              <label>
                Company
                <input
                  value={experience.company}
                  onChange={e => update(index, 'company', e.target.value)}
                />
              </label>

              <label>
                Dates
                <input
                  value={experience.dates}
                  onChange={e => update(index, 'dates', e.target.value)}
                />
              </label>

              <label>
                Responsibilities
                <span className="helper-text">
                  Enter one bullet point per line.
                </span>
                <textarea
                  value={experience.description.join('\n')}
                  onChange={e =>
                    update(index, 'description', e.target.value)
                  }
                />
              </label>

              <div className="experience-actions">
                {!isFirst && (
                  <button
                    type="button"
                    className="move-button"
                    onClick={() => moveExperienceUp(index)}
                    title="Move experience up"
                  >
                    ↑
                  </button>
                )}

                {!isLast && (
                  <button
                    type="button"
                    className="move-button"
                    onClick={() => moveExperienceDown(index)}
                    title="Move experience down"
                  >
                    ↓
                  </button>
                )}

                <button
                  type="button"
                  className="delete-button"
                  onClick={() => remove(index)}
                >
                  Delete Experience
                </button>
              </div>
            </div>
          </details>
        )
      })}

      <button
        type="button"
        className="add-section-button"
        onClick={add}
      >
        + Add Experience
      </button>
    </div>
  )
}
