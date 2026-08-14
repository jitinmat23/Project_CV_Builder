import { useCV } from '../../context/CVContext'
import { cvLabels } from '../../utils/i18n'
export default function ProfileSection() { const { cv, language }=useCV(); return <section className="cv-section"><h2>{cvLabels[language].profile}</h2><p>{cv.profile}</p></section> }
