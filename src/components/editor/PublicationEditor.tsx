import { useCV } from '../../context/CVContext'

export default function PublicationEditor() {
  const { cv, updatePublication } = useCV()

  return (
    <div className="editor-card">
      <label>
        Publication
        <input
          value={cv.publication.name}
          onChange={e =>
            updatePublication('name', e.target.value)
          }
        />
      </label>

      <label>
        Publication Link
        <span className="helper-text">
          Optional. Enter webpage, DOI or URL.
        </span>
        <input
          type="url"
          placeholder="https://..."
          value={cv.publication.url}
          onChange={e =>
            updatePublication('url', e.target.value)
          }
        />
      </label>
    </div>
  )
}
