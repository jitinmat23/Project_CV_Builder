import { useCV } from '../../context/CVContext'
import type { Education } from '../../types/cv'

export default function EducationEditor() {
  const { cv, updateEducations } = useCV()

  function add() {
    updateEducations([
      ...cv.educations,
      {
        degree: 'New Degree',
        institution: 'Institution',
        dates: '',
        grade: '',
      },
    ])
  }

  function update(index: number, field: keyof Education, value: string) {
    const next = [...cv.educations]
    next[index] = { ...next[index], [field]: value }
    updateEducations(next)
  }

  function remove(index: number) {
    updateEducations(cv.educations.filter((_, i) => i !== index))
  }

  return (
    <div>
      {cv.educations.map((education, index) => (
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
            {(
              [
                ['degree', 'Degree'],
                ['institution', 'Institution'],
                ['dates', 'Dates'],
                ['grade', 'Grade'],
              ] as const
            ).map(([field, label]) => (
              <label key={field}>
                {label}
                <input
                  value={education[field]}
                  onChange={e => update(index, field, e.target.value)}
                />
              </label>
            ))}

            <button className="delete-button" onClick={() => remove(index)}>
              Delete Education
            </button>
          </div>
        </details>
      ))}

      <button className="add-section-button" onClick={add}>
        + Add Education
      </button>
    </div>
  )
}
