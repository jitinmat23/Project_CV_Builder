import { useCV } from '../../context/CVContext'
import { cvLabels } from '../../utils/i18n'
export default function LanguageSection() { const { cv, language }=useCV(); return <section className="sidebar-section"><h2>{cvLabels[language].languages}</h2>{cv.languages.map((item,index)=><div className="language-row" key={index}><span>{item.name}</span><strong>{item.level}</strong></div>)}</section> }
