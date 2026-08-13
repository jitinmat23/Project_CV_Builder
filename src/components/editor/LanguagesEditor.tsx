import { useCV } from '../../context/CVContext'
import type { Language } from '../../types/cv'

export default function LanguagesEditor() {
  const { cv, updateLanguages } = useCV()

  function add() {
    updateLanguages([
      ...cv.languages,
      { name: 'New Language', level: 'B1' },
    ])
  }

  function update(index: number, field: keyof Language, value: string) {
    const next = [...cv.languages]
    next[index] = { ...next[index], [field]: value }
    updateLanguages(next)
  }

  function remove(index: number) {
    updateLanguages(cv.languages.filter((_, i) => i !== index))
  }

  return (
    <div>
      {cv.languages.map((language, index) => (
        <details className="editor-item" key={index} open={index === 0}>
          <summary>
            <div className="item-summary">
              <span className="item-number">{index + 1}</span>
              <div>
                <strong>{language.name || 'New Language'}</strong>
                <span>{language.level}</span>
              </div>
            </div>
          </summary>

          <div className="item-body">
            <label>
              Language
              <input
                value={language.name}
                onChange={e => update(index, 'name', e.target.value)}
              />
            </label>

            <label>
              Level
              <input
                value={language.level}
                onChange={e => update(index, 'level', e.target.value)}
              />
            </label>

            <button className="delete-button" onClick={() => remove(index)}>
              Delete Language
            </button>
          </div>
        </details>
      ))}

      <button className="add-section-button" onClick={add}>
        + Add Language
      </button>
    </div>
  )
}
