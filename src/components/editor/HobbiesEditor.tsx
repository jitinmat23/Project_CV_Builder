import { useCV } from '../../context/CVContext'

export default function HobbiesEditor() {
  const { cv, updateHobbies } = useCV()

  return (
    <div className="editor-card">
      <input
        value={cv.hobbies}
        onChange={e => updateHobbies(e.target.value)}
      />
    </div>
  )
}
