import { useCV } from '../../context/CVContext'

export default function CVHeader() {
  const { cv } = useCV()

  return (
    <div className="cv-top">
      <div className="cv-photo-column">
        {cv.personal.photo ? (
          <img
            src={cv.personal.photo}
            alt="Profile"
            className="cv-profile-photo"
          />
        ) : (
          <div className="cv-photo-placeholder">
            PHOTO
          </div>
        )}
      </div>

      <div className="cv-header">
        <div className="cv-header-content">
          <h1>{cv.personal.name}</h1>
          <div className="header-rule" />
          <h3>{cv.personal.jobTitle}</h3>
        </div>
      </div>
    </div>
  )
}
