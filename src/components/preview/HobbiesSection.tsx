import { useCV } from '../../context/CVContext'
import { cvLabels } from '../../utils/i18n'
export default function HobbiesSection() { const { cv, language }=useCV(); return <section className="sidebar-section"><h2>{cvLabels[language].interests}</h2><p>{cv.hobbies}</p></section> }
