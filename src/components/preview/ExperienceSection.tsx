import { useCV } from '../../context/CVContext'

export default function ExperienceSection() {
  const { cv } = useCV()

  return (
    <section className="cv-section">
      <h2>WORK EXPERIENCE</h2>

      {cv.experiences.map((experience, index) => (
        <article className="experience-entry" key={index}>
          <div className="experience-header">
            <div>
              <h3>{experience.position}</h3>
              <div className="company">{experience.company}</div>
            </div>

            <span className="date-badge">
              {experience.dates}
            </span>
          </div>

          <div className="experience-bullets">
            {experience.description
              .filter(item => item.trim() !== '')
              .map((item, bulletIndex) => (
                <div
                  className="experience-bullet"
                  key={bulletIndex}
                >
                  <span className="bullet-symbol">•</span>
                  <span className="bullet-text">{item}</span>
                </div>
              ))}
          </div>
        </article>
      ))}
    </section>
  )
}
