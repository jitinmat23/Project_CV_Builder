import { useCV } from '../../context/CVContext'
import { getSafeUrl } from '../../utils/url'
import { cvLabels } from '../../utils/i18n'
export default function PublicationSection() { const { cv, language }=useCV(); return <section className="sidebar-section"><h2>{cvLabels[language].publications}</h2><p>{cv.publication.url?<a href={getSafeUrl(cv.publication.url)} target="_blank" rel="noopener noreferrer">{cv.publication.name}</a>:cv.publication.name}</p></section> }
