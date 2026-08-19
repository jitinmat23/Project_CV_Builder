import { useCV } from '../../context/CVContext'
import { getSafeUrl } from '../../utils/url'
import { cvLabels } from '../../utils/i18n'

export default function ATSPreview() {
  const { cv, language, sectionVisibility } = useCV()
  const labels = cvLabels[language]

  return (
    <div className="ats-cv-page">
      <header className="ats-header">
        <div className="ats-header-main">
          <h1>{cv.personal.name}</h1>

          {cv.personal.jobTitle && (
            <h2>{cv.personal.jobTitle}</h2>
          )}

          <div className="ats-contact-line">
            {cv.personal.location && (
              <span>{cv.personal.location}</span>
            )}
            {cv.personal.phone && (
              <span>{cv.personal.phone}</span>
            )}
            {cv.personal.email && (
              <span>{cv.personal.email}</span>
            )}
          </div>

          <div className="ats-links-line">
            {cv.personal.linkedin && (
              <span>
                {cv.personal.linkedinUrl ? (
                  <a
                    href={getSafeUrl(cv.personal.linkedinUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn: {cv.personal.linkedin}
                  </a>
                ) : (
                  <>LinkedIn: {cv.personal.linkedin}</>
                )}
              </span>
            )}

            {cv.personal.xing && (
              <span>
                {cv.personal.xingUrl ? (
                  <a
                    href={getSafeUrl(cv.personal.xingUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    XING: {cv.personal.xing}
                  </a>
                ) : (
                  <>XING: {cv.personal.xing}</>
                )}
              </span>
            )}

            {cv.personal.github && (
              <span>
                {cv.personal.githubUrl ? (
                  <a
                    href={getSafeUrl(cv.personal.githubUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub: {cv.personal.github}
                  </a>
                ) : (
                  <>GitHub: {cv.personal.github}</>
                )}
              </span>
            )}
          </div>
        </div>

        <div className="ats-photo-wrap">
          {cv.personal.photo ? (
            <img
              src={cv.personal.photo}
              alt="Profile"
              className="ats-photo"
            />
          ) : (
            <div className="ats-photo-placeholder">
              PHOTO
            </div>
          )}
        </div>
      </header>

      {sectionVisibility.profile && cv.profile.trim() && (
        <section className="ats-section">
          <h3>{labels.profile}</h3>
          <p>{cv.profile}</p>
        </section>
      )}

      {sectionVisibility.skills && cv.skills.length > 0 && (
        <section className="ats-section">
          <h3>{labels.skills}</h3>

          <ul className="ats-bullet-list">
            {cv.skills.map((skill, index) => (
              <li key={index}>
                <strong>{skill.category}:</strong>{' '}
                {skill.skills}
              </li>
            ))}
          </ul>
        </section>
      )}

      {sectionVisibility.experience && cv.experiences.length > 0 && (
        <section className="ats-section">
          <h3>{labels.workExperience}</h3>

          {cv.experiences.map((experience, index) => (
            <article
              className="ats-experience"
              key={index}
            >
              {/* Header is intentionally separate from the bullet
                  list so the header stays together while bullets
                  remain free to continue onto the next page. */}
              <div className="ats-experience-heading">
                <div className="ats-entry-topline">
                  <span className="ats-date">
                    {experience.dates}
                  </span>

                  {experience.country && (
                    <span className="ats-location">
                      {experience.country}
                    </span>
                  )}
                </div>

                <h4>{experience.position}</h4>

                <div className="ats-company">
                  {experience.company}
                </div>
              </div>

              {experience.description.some(
                item => item.trim() !== ''
              ) && (
                <ul className="ats-bullet-list ats-experience-bullets">
                  {experience.description
                    .filter(item => item.trim() !== '')
                    .map((item, bulletIndex) => (
                      <li key={bulletIndex}>
                        {item}
                      </li>
                    ))}
                </ul>
              )}
            </article>
          ))}
        </section>
      )}

      {sectionVisibility.education && cv.educations.length > 0 && (
        <section className="ats-section">
          <h3>{labels.education}</h3>

          {cv.educations.map((education, index) => (
            <article
              className="ats-education"
              key={index}
            >
              <div className="ats-education-heading">
                <div className="ats-entry-topline">
                  <span className="ats-date">
                    {education.dates}
                  </span>

                  {education.country && (
                    <span className="ats-location">
                      {education.country}
                    </span>
                  )}
                </div>

                <h4>{education.degree}</h4>

                <div className="ats-company">
                  {education.institution}
                </div>

                {education.grade && (
                  <div className="ats-grade">
                    {labels.grade}: {education.grade}
                  </div>
                )}
              </div>
            </article>
          ))}
        </section>
      )}

      {sectionVisibility.certifications && cv.certifications.length > 0 && (
        <section className="ats-section">
          <h3>{labels.certifications}</h3>

          <ul className="ats-bullet-list">
            {cv.certifications.map(
              (certification, index) => (
                <li key={index}>
                  {certification.url ? (
                    <a
                      href={getSafeUrl(certification.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {certification.name}
                    </a>
                  ) : (
                    certification.name
                  )}
                </li>
              )
            )}
          </ul>
        </section>
      )}

      {sectionVisibility.languages && cv.languages.length > 0 && (
        <section className="ats-section">
          <h3>{labels.languageSkills}</h3>

          <ul className="ats-bullet-list">
            {cv.languages.map((item, index) => (
              <li key={index}>
                {item.name} – {item.level}
              </li>
            ))}
          </ul>
        </section>
      )}

      {sectionVisibility.publication && cv.publication.name.trim() && (
        <section className="ats-section">
          <h3>{labels.publications}</h3>

          <p>
            {cv.publication.url ? (
              <a
                href={getSafeUrl(cv.publication.url)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {cv.publication.name}
              </a>
            ) : (
              cv.publication.name
            )}
          </p>
        </section>
      )}

      {sectionVisibility.interests && cv.hobbies.trim() && (
        <section className="ats-section">
          <h3>{labels.interests}</h3>
          <p>{cv.hobbies}</p>
        </section>
      )}

      {cv.customSections
        .filter(section => section.visible && section.title.trim() && section.content.trim())
        .sort((a, b) => a.order - b.order)
        .map(section => (
          <section className="ats-section ats-custom-section" key={section.id}>
            <h3>{section.title}</h3>
            <div className="ats-custom-content">
              {section.content.split('\n').map((line, index) =>
                line.trim() ? (
                  <div className="ats-custom-line" key={index}>
                    {line.trim()}
                  </div>
                ) : null
              )}
            </div>
          </section>
        ))}
    </div>
  )
}
