import { useCV } from '../../context/CVContext'
import { cvLabels } from '../../utils/i18n'
export default function SkillsSection() { const { cv, language }=useCV(); return <section className="cv-section"><h2>{cvLabels[language].professionalSkills}</h2><div className="skills-list">{cv.skills.map((skill,index)=><div className="skill-category" key={index}><strong>{skill.category}:</strong><span>{skill.skills}</span></div>)}</div></section> }
