import { useCV } from '../../context/CVContext'

export default function ProfileSection() {
  const { cv } = useCV()

  return (
    <section className="cv-section">
      <h2>PROFILE</h2>
      <p>{cv.profile}</p>
    </section>
  )
}
