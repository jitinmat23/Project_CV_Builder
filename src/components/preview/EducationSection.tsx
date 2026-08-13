import { useCV } from '../../context/CVContext'

export default function EducationSection() {
  const { cv } = useCV()

  return (
    <section className="sidebar-section">
      <h2>EDUCATION</h2>

      {cv.educations.map((education, index) => (
        <div className="sidebar-entry" key={index}>
          <strong>{education.dates}</strong>
          <b>{education.degree}</b>
          <span>{education.institution}</span>
          <span>Note: {education.grade}</span>
        </div>
      ))}
    </section>
  )
}
