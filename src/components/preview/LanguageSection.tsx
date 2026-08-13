import { useCV } from '../../context/CVContext'

export default function LanguageSection() {
  const { cv } = useCV()

  return (
    <section className="sidebar-section">
      <h2>LANGUAGES</h2>

      {cv.languages.map((language, index) => (
        <div className="language-row" key={index}>
          <span>{language.name}</span>
          <strong>{language.level}</strong>
        </div>
      ))}
    </section>
  )
}
