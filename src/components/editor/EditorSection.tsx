import type { ReactNode } from 'react'

type Props = {
  title: string
  action?: ReactNode
  children: ReactNode
}

export default function EditorSection({
  title,
  action,
  children,
}: Props) {
  return (
    <section className="editor-section">
      <div className="section-title-row">
        <h2>{title}</h2>
        {action}
      </div>
      {children}
    </section>
  )
}
