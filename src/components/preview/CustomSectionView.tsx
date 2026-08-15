import type { CustomSection } from '../../types/cv'

type Props = {
  section: CustomSection
  className?: string
}

export default function CustomSectionView({
  section,
  className = '',
}: Props) {
  if (!section.visible || !section.title.trim() || !section.content.trim()) {
    return null
  }

  return (
    <section className={`custom-section-view ${className}`}>
      <h3>{section.title}</h3>
      <div className="custom-section-content">
        {section.content}
      </div>
    </section>
  )
}
