import { useCV } from '../../context/CVContext'

export default function SkillsSection() {
  const { cv } = useCV()

  return (
    <section className="cv-section">
      <h2>PROFESSIONAL SKILLS</h2>

      <div className="skills-list">
        {cv.skills.map((skill, index) => (
          <div className="skill-category" key={index}>
            <strong>{skill.category}:</strong>
            <span>{skill.skills}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
