import { useCV } from '../../context/CVContext'

export default function ProfileEditor() {
  const { cv, updateProfile } = useCV()

  return (
    <div className="editor-card">
      <textarea
        className="profile-editor"
        value={cv.profile}
        onChange={e => updateProfile(e.target.value)}
      />
    </div>
  )
}
