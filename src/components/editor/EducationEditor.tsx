import { useCV } from '../../context/CVContext'
import type { Education } from '../../types/cv'

export default function EducationEditor() {
  const {
    cv,
    updateEducations,
    moveEducationUp,
    moveEducationDown,
  } = useCV()

  function add() {
    updateEducations([
      ...cv.educations,
      {
        degree: 'New Degree',
        institution: 'Institution',
        dates: '',
        country: '',
        grade: '',
      },
    ])
  }

  function update(
    index: number,
    field: keyof Education,
    value: string
  ) {
    const next = [...cv.educations]
    next[index] = { ...next[index], [field]: value }
    updateEducations(next)
  }

  function remove(index: number) {
    updateEducations(cv.educations.filter((_, i) => i !== index))
  }

  return (
    <div>
      {cv.educations.map((education, index) => {
        const isFirst = index === 0
        const isLast = index === cv.educations.length - 1

        return (
          <details className="editor-item" key={index} open={index === 0}>
            <summary>
              <div className="item-summary">
                <span className="item-number">{index + 1}</span>
                <div>
                  <strong>{education.degree || 'New Degree'}</strong>
                  <span>{education.institution || 'Institution'}</span>
                  <small>{education.dates}</small>
                </div>
              </div>
            </summary>

            <div className="item-body">
              <label>
                Degree
                <input
                  value={education.degree}
                  onChange={e => update(index, 'degree', e.target.value)}
                />
              </label>

              <label>
                Institution
                <input
                  value={education.institution}
                  onChange={e =>
                    update(index, 'institution', e.target.value)
                  }
                />
              </label>

              <label>
                Dates
                <input
                  value={education.dates}
                  onChange={e => update(index, 'dates', e.target.value)}
                />
              </label>

              <label>
                Country
                <input
                  value={education.country}
                  onChange={e => update(index, 'country', e.target.value)}
                  placeholder="e.g. Germany"
                />
              </label>

              <label>
                Grade
                <input
                  value={education.grade}
                  onChange={e => update(index, 'grade', e.target.value)}
                />
              </label>

              <div className="experience-actions">
                {!isFirst && (
                  <button
                    type="button"
                    className="move-button"
                    onClick={() => moveEducationUp(index)}
                    title="Move education up"
                  >
                    ↑
                  </button>
                )}

                {!isLast && (
                  <button
                    type="button"
                    className="move-button"
                    onClick={() => moveEducationDown(index)}
                    title="Move education down"
                  >
                    ↓
                  </button>
                )}

                <button
                  type="button"
                  className="delete-button"
                  onClick={() => remove(index)}
                >
                  Delete Education
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
        + Add Education
      </button>
    </div>
  )
}
