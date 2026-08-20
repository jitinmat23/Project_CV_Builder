const PRINT_CLASS = 'cv-print-mode'

export function downloadCVPdf(
  _element: HTMLElement,
  _filename: string,
) {
  /*
   * The CV is already rendered in the DOM.
   * Native browser printing preserves text as real PDF text,
   * unlike html2canvas/html2pdf which rasterizes the CV.
   */

  document.body.classList.add(PRINT_CLASS)

  const cleanup = () => {
    document.body.classList.remove(PRINT_CLASS)
    window.removeEventListener('afterprint', cleanup)
  }

  window.addEventListener('afterprint', cleanup)

  /*
   * Give the browser one frame to apply the print styles
   * before opening the print dialog.
   */
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      window.print()
    })
  })
}