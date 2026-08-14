import { useCV } from '../../context/CVContext'

export default function TemplateSelector() {
  const { template, setTemplate, language, setLanguage } = useCV()

  return (
    <section className="template-selector">
      <div className="template-selector-header">
        <div>
          <h2>CV TEMPLATE</h2>
          <p>Choose the layout and language for this CV. Your content stays the same.</p>
        </div>
      </div>

      <div className="template-options">
        <button type="button" className={`template-option ${template === 'professional' ? 'active' : ''}`} onClick={() => setTemplate('professional')}>
          <span className="template-option-preview professional-preview">
            <span className="mini-sidebar" />
            <span className="mini-main"><i /><i /><i /><i /></span>
          </span>
          <span className="template-option-text"><strong>Professional</strong><small>Two-column · Current design</small></span>
          {template === 'professional' && <span className="template-check">✓</span>}
        </button>

        <button type="button" className={`template-option ${template === 'ats' ? 'active' : ''}`} onClick={() => setTemplate('ats')}>
          <span className="template-option-preview ats-preview-thumb">
            <span className="mini-ats-header" />
            <span className="mini-ats-lines"><i /><i /><i /><i /><i /></span>
          </span>
          <span className="template-option-text"><strong>ATS + Photo</strong><small>Single-column · Photo header</small></span>
          {template === 'ats' && <span className="template-check">✓</span>}
        </button>
      </div>

      <div className="language-selector">
        <div className="language-selector-title">LANGUAGE</div>
        <div className="language-options">
          <button type="button" className={`language-option ${language === 'en' ? 'active' : ''}`} onClick={() => setLanguage('en')}>English</button>
          <button type="button" className={`language-option ${language === 'de' ? 'active' : ''}`} onClick={() => setLanguage('de')}>Deutsch</button>
        </div>
      </div>
    </section>
  )
}
