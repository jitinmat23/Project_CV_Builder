import html2pdf from 'html2pdf.js'

const PDF_MARGIN_TOP_MM = 8
const PDF_MARGIN_RIGHT_MM = 10
const PDF_MARGIN_BOTTOM_MM = 8
const PDF_MARGIN_LEFT_MM = 10

function createOptions(filename: string) {
  return {
    margin: [
      PDF_MARGIN_TOP_MM,
      PDF_MARGIN_RIGHT_MM,
      PDF_MARGIN_BOTTOM_MM,
      PDF_MARGIN_LEFT_MM,
    ] as [number, number, number, number],

    filename,

    image: {
      type: 'jpeg' as const,
      quality: 0.98,
    },

    html2canvas: {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      scrollX: 0,
      scrollY: 0,
    },

    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait' as const,
      compress: true,
    },

    pagebreak: {
      mode: ['css', 'legacy'],
      avoid: [
        '.experience-bullet',
        '.sidebar-section',
        '.sidebar-entry',
        '.language-row',
        '.skill-category',
        '.experience-header',
        '.custom-section-view',

        // ATS
        '.ats-header',
        '.ats-photo-wrap',
        '.ats-section h3',
        '.ats-experience-heading',
        '.ats-education-heading',
        '.ats-bullet-list li',
      ],
    },
  }
}

export async function downloadCVPdf(
  element: HTMLElement,
  filename: string,
) {
  /*
   * Keep PDF export on the original working html2pdf flow.
   *
   * The explicit page-by-page Professional exporter was causing
   * blank PDFs because html2canvas/html2pdf was capturing the
   * generated fixed-position page container incorrectly.
   *
   * Sidebar repetition will be handled separately at the
   * Professional layout level instead of breaking PDF export.
   */
  const options = createOptions(filename)

  await html2pdf()
    .set(options)
    .from(element)
    .save()
}
