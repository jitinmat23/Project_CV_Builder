import html2pdf from 'html2pdf.js'

export function downloadCVPdf(
  element: HTMLElement,
  filename: string,
) {
  const options = {
    margin: [
      8,
      10,
      8,
      10,
    ] as [
      number,
      number,
      number,
      number,
    ],

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

  html2pdf()
    .set(options)
    .from(element)
    .save()
}