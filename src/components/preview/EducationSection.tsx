import { useCV } from '../../context/CVContext'
import { cvLabels } from '../../utils/i18n'
export default function EducationSection() { const { cv, language }=useCV(); const l=cvLabels[language]; return <section className="sidebar-section"><h2>{l.education}</h2>{cv.educations.map((education,index)=><div className="sidebar-entry" key={index}><strong>{education.dates}</strong><b>{education.degree}</b><span>{education.institution}</span>{education.grade&&<span>{l.grade}: {education.grade}</span>}</div>)}</section> }
