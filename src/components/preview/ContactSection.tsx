import { useCV } from '../../context/CVContext'
import type { ReactNode } from 'react'
import { getSafeUrl } from '../../utils/url'
import { cvLabels } from '../../utils/i18n'

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="social-icon-svg"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="3"
        fill="currentColor"
      />

      <path
        d="M7 9.5V17h2.5V9.5H7Zm1.25-3A1.5 1.5 0 1 0 8.25 9 1.5 1.5 0 0 0 8.25 6.5ZM11.5 9.5V17H14v-4.05c0-1.07.2-2.1 1.55-2.1 1.32 0 1.35 1.23 1.35 2.17V17h2.5v-4.5c0-2.21-.48-3.9-3.1-3.9-1.26 0-2.1.69-2.45 1.35h-.03V9.5H11.5Z"
        fill="#fff"
      />
    </svg>
  )
}

function XingIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="social-icon-svg social-icon-xing"
    >
      <path
        d="M9.1 5.2H6.7c-.45 0-.7.5-.48.89l2.05 3.62-2.7 4.78c-.23.4.06.91.52.91h2.42c.2 0 .4-.11.5-.3l2.7-4.78-2.08-3.69a.92.92 0 0 0-.53-.43Z"
        fill="currentColor"
      />

      <path
        d="M14.25 4.1c-.19 0-.37.1-.47.27l-4.9 8.66 3.13 5.52c.1.18.28.29.49.29h2.43c.45 0 .73-.49.51-.88l-2.64-4.66 4.67-8.25c.22-.39-.06-.88-.51-.88h-2.71Z"
        fill="currentColor"
      />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="social-icon-svg"
    >
      <path
        fill="currentColor"
        d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.75-1.32-3.75-1.32-.51-1.3-1.24-1.65-1.24-1.65-1.01-.7.08-.69.08-.69 1.12.08 1.7 1.15 1.7 1.15.99 1.69 2.6 1.2 3.24.92.1-.72.39-1.2.71-1.48-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.21 1.16-2.99-.12-.28-.5-1.42.11-2.95 0 0 .95-.3 3.1 1.14a10.8 10.8 0 0 1 5.64 0c2.15-1.44 3.1-1.14 3.1-1.14.61 1.53.23 2.67.11 2.95.72.78 1.16 1.77 1.16 2.99 0 4.29-2.61 5.23-5.1 5.51.4.35.76 1.04.76 2.1v3.11c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z"
      />
    </svg>
  )
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: ReactNode
}) {
  return (
    <a
      className="social-icon-link"
      href={getSafeUrl(href)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
    >
      {children}
    </a>
  )
}

export default function ContactSection() {
  const { cv, language } = useCV()

  const l = cvLabels[language]

  const hasSocialLinks = Boolean(
    (cv.personal.linkedin && cv.personal.linkedinUrl) ||
      (cv.personal.xing && cv.personal.xingUrl) ||
      (cv.personal.github && cv.personal.githubUrl),
  )

  return (
    <section className="sidebar-section">
      <h2>{l.contact}</h2>

      {/* Location */}
      {cv.personal.location && (
        <div className="contact-row">
          {cv.personal.location}
        </div>
      )}

      {/* Phone */}
      {cv.personal.phone && (
        <div className="contact-row">
          {cv.personal.phone}
        </div>
      )}

      {/* Email */}
      {cv.personal.email && (
        <div className="contact-row">
          {cv.personal.email}
        </div>
      )}

      {/* Driving licence */}
      {cv.personal.drivingLicence && (
        <div className="contact-row">
          {cv.personal.drivingLicence}
        </div>
      )}

      {/* Birthday */}
      {cv.personal.birthday && (
        <div className="contact-row">
          {cv.personal.birthday}
        </div>
      )}

      {/* Nationality */}
      {cv.personal.nationality && (
        <div className="contact-row">
          {l.nationality}: {cv.personal.nationality}
        </div>
      )}

      {/* =====================================================
          SOCIAL ICONS
          These intentionally come LAST in the Contact section.
          ===================================================== */}
      {hasSocialLinks && (
        <div
          className="contact-social-links"
          aria-label="Professional social links"
        >
          {/* LinkedIn */}
          {cv.personal.linkedin && cv.personal.linkedinUrl && (
            <SocialLink
              href={cv.personal.linkedinUrl}
              label="LinkedIn"
            >
              <LinkedInIcon />
            </SocialLink>
          )}

          {/* XING */}
          {cv.personal.xing && cv.personal.xingUrl && (
            <SocialLink
              href={cv.personal.xingUrl}
              label="XING"
            >
              <XingIcon />
            </SocialLink>
          )}

          {/* GitHub */}
          {cv.personal.github && cv.personal.githubUrl && (
            <SocialLink
              href={cv.personal.githubUrl}
              label="GitHub"
            >
              <GitHubIcon />
            </SocialLink>
          )}
        </div>
      )}
    </section>
  )
}