import { useCV } from '../../context/CVContext'
import { getSafeUrl } from '../../utils/url'
import { cvLabels } from '../../utils/i18n'
export default function CertificationSection() { const { cv, language }=useCV(); return <section className="sidebar-section"><h2>{cvLabels[language].certifications}</h2>{cv.certifications.map((c,index)=><div className="sidebar-entry" key={index}>{c.url?<a href={getSafeUrl(c.url)} target="_blank" rel="noopener noreferrer">{c.name}</a>:c.name}</div>)}</section> }
