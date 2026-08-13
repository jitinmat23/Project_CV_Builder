import { useCV } from '../../context/CVContext'
import { getSafeUrl } from '../../utils/url'

export default function CertificationSection() {
  const { cv } = useCV()

  return (
    <section className="sidebar-section">
      <h2>ADVANCED TRAINING</h2>

      {cv.certifications.map((certification, index) => (
        <div className="sidebar-entry" key={index}>
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
        </div>
      ))}
    </section>
  )
}
