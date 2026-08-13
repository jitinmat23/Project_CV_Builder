import { useCV } from '../../context/CVContext'
import { getSafeUrl } from '../../utils/url'

export default function ContactSection() {
  const { cv } = useCV()

  return (
    <section className="sidebar-section">
      <h2>CONTACT</h2>

      <div className="contact-row">{cv.personal.location}</div>
      <div className="contact-row">{cv.personal.phone}</div>
      <div className="contact-row">{cv.personal.email}</div>

      {cv.personal.linkedin && (
        <div className="contact-row">
          {cv.personal.linkedinUrl ? (
            <a
              href={getSafeUrl(cv.personal.linkedinUrl)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {cv.personal.linkedin}
            </a>
          ) : (
            cv.personal.linkedin
          )}
        </div>
      )}

      {cv.personal.xing && (
        <div className="contact-row">
          {cv.personal.xingUrl ? (
            <a
              href={getSafeUrl(cv.personal.xingUrl)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {cv.personal.xing}
            </a>
          ) : (
            cv.personal.xing
          )}
        </div>
      )}

      {cv.personal.github && (
        <div className="contact-row">
          {cv.personal.githubUrl ? (
            <a
              href={getSafeUrl(cv.personal.githubUrl)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {cv.personal.github}
            </a>
          ) : (
            cv.personal.github
          )}
        </div>
      )}

      <div className="contact-row">
        {cv.personal.drivingLicence}
      </div>

      <div className="contact-row">
        {cv.personal.birthday}
      </div>

      <div className="contact-row">
        Nationality: {cv.personal.nationality}
      </div>
    </section>
  )
}
