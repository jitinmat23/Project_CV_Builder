import { useCV } from '../../context/CVContext'
import type { SkillCategory } from '../../types/cv'

export default function SkillsEditor() {
  const { cv, updateSkills } = useCV()

  function add() {
    updateSkills([
      ...cv.skills,
      { category: 'New Skill Category', skills: '' },
    ])
  }

  function update(index: number, field: keyof SkillCategory, value: string) {
    const next = [...cv.skills]
    next[index] = { ...next[index], [field]: value }
    updateSkills(next)
  }

  function remove(index: number) {
    updateSkills(cv.skills.filter((_, i) => i !== index))
  }

  return (
    <div>
      {cv.skills.map((skill, index) => (
        <details className="editor-item" key={index} open={index === 0}>
          <summary>
            <div className="item-summary">
              <span className="item-number">{index + 1}</span>
              <div>
                <strong>{skill.category || 'New Skill Category'}</strong>
                <span>{skill.skills || 'No skills added'}</span>
              </div>
            </div>
          </summary>

          <div className="item-body">
            <label>
              Category
              <input
                value={skill.category}
                onChange={e => update(index, 'category', e.target.value)}
              />
            </label>

            <label>
              Skills
              <input
                value={skill.skills}
                onChange={e => update(index, 'skills', e.target.value)}
              />
            </label>

            <button className="delete-button" onClick={() => remove(index)}>
              Delete Skill Category
            </button>
          </div>
        </details>
      ))}

      <button className="add-section-button" onClick={add}>
        + Add Skill Category
      </button>
    </div>
  )
}
