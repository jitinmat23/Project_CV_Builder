import { useCV } from '../../context/CVContext'

export default function HobbiesSection() {
  const { cv } = useCV()

  return (
    <section className="sidebar-section">
      <h2>HOBBIES</h2>
      <p>{cv.hobbies}</p>
    </section>
  )
}
