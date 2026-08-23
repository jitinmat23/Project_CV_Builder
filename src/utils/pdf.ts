/**
 * Direct PDF download through the local Playwright server.
 *
 * Sends the rendered CV plus the current document <head> so the server
 * has the same CSS/fonts as the React preview.
 */

export async function downloadCVPdf(
  element: HTMLElement,
  filename = 'cv.pdf',
): Promise<void> {
  const html = element.outerHTML
  const head = document.head.innerHTML

  const response = await fetch('http://localhost:3001/api/pdf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      html,
      head,
      filename,
    }),
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'PDF generation failed.')
  }

  const blob = await response.blob()
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()

  window.setTimeout(() => {
    URL.revokeObjectURL(url)
  }, 1000)
}
