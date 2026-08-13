import { useCV } from '../../context/CVContext'
import { getSafeUrl } from '../../utils/url'

export default function PublicationSection() {
  const { cv } = useCV()

  return (
    <section className="sidebar-section">
      <h2>PUBLICATION</h2>

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
  )
}
