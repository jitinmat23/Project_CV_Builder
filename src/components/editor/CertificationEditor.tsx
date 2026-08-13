import { useCV } from '../../context/CVContext'
import type { Certification } from '../../types/cv'

export default function CertificationEditor() {
  const { cv, updateCertifications } = useCV()

  function add() {
    updateCertifications([
      ...cv.certifications,
      { name: 'New Certification', url: '' },
    ])
  }

  function update(
    index: number,
    field: keyof Certification,
    value: string
  ) {
    const next = [...cv.certifications]
    next[index] = { ...next[index], [field]: value }
    updateCertifications(next)
  }

  function remove(index: number) {
    updateCertifications(cv.certifications.filter((_, i) => i !== index))
  }

  return (
    <div>
      {cv.certifications.map((certification, index) => (
        <details className="editor-item" key={index} open={index === 0}>
          <summary>
            <div className="item-summary">
              <span className="item-number">{index + 1}</span>
              <div>
                <strong>
                  {certification.name || 'New Certification'}
                </strong>
                {certification.url && <span>Link added</span>}
              </div>
            </div>
          </summary>

          <div className="item-body">
            <label>
              Certification
              <input
                value={certification.name}
                onChange={e => update(index, 'name', e.target.value)}
              />
            </label>

            <label>
              Certification Link
              <span className="helper-text">
                Optional. Enter the certification webpage.
              </span>
              <input
                type="url"
                placeholder="https://..."
                value={certification.url}
                onChange={e => update(index, 'url', e.target.value)}
              />
            </label>

            <button className="delete-button" onClick={() => remove(index)}>
              Delete Certification
            </button>
          </div>
        </details>
      ))}

      <button className="add-section-button" onClick={add}>
        + Add Certification
      </button>
    </div>
  )
}
