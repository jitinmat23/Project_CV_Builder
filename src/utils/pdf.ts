import html2pdf from 'html2pdf.js'

const PDF_MARGIN_TOP_MM = 8
const PDF_MARGIN_RIGHT_MM = 10
const PDF_MARGIN_BOTTOM_MM = 8
const PDF_MARGIN_LEFT_MM = 10
const PAGE_WIDTH_MM = 190
const PAGE_HEIGHT_MM = 281
const HEADER_HEIGHT_MM = 48
const SIDEBAR_WIDTH_PERCENT = 31
const MAIN_WIDTH_PERCENT = 69


function createBaseOptions(filename: string) {
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

function cloneElement(element: Element): HTMLElement {
  return element.cloneNode(true) as HTMLElement
}

function createPage(): HTMLElement {
  const page = document.createElement('div')

  page.className = 'pdf-professional-page'

  Object.assign(page.style, {
    width: `${PAGE_WIDTH_MM}mm`,
    height: `${PAGE_HEIGHT_MM}mm`,
    minHeight: `${PAGE_HEIGHT_MM}mm`,
    margin: '0',
    padding: '0',
    background: '#ffffff',
    overflow: 'hidden',
    boxSizing: 'border-box',
    breakAfter: 'page',
    pageBreakAfter: 'always',
    boxShadow: 'none',
  })

  return page
}

function createContentRow(heightMm: number): HTMLElement {
  const row = document.createElement('div')

  row.className = 'pdf-professional-content-row'

  Object.assign(row.style, {
    display: 'flex',
    width: `${PAGE_WIDTH_MM}mm`,
    height: `${heightMm}mm`,
    minHeight: `${heightMm}mm`,
    margin: '0',
    padding: '0',
    alignItems: 'stretch',
    boxSizing: 'border-box',
    overflow: 'hidden',
  })

  return row
}

function createSidebarClone(sidebar: HTMLElement): HTMLElement {
  const clone = cloneElement(sidebar)

  clone.classList.add('pdf-professional-sidebar')

  Object.assign(clone.style, {
    flex: `0 0 ${SIDEBAR_WIDTH_PERCENT}%`,
    width: `${SIDEBAR_WIDTH_PERCENT}%`,
    maxWidth: `${SIDEBAR_WIDTH_PERCENT}%`,
    height: '100%',
    minHeight: '100%',
    boxSizing: 'border-box',
    background: '#f3f3f3',
    overflow: 'hidden',
  })

  return clone
}

function createMainClone(): HTMLElement {
  const main = document.createElement('main')

  main.className = 'cv-main pdf-professional-main'

  Object.assign(main.style, {
    flex: `0 0 ${MAIN_WIDTH_PERCENT}%`,
    width: `${MAIN_WIDTH_PERCENT}%`,
    maxWidth: `${MAIN_WIDTH_PERCENT}%`,
    height: '100%',
    minHeight: '100%',
    minWidth: '0',
    boxSizing: 'border-box',
    overflow: 'hidden',
  })

  return main
}

function getMainBlocks(main: HTMLElement): HTMLElement[] {
  const blocks: HTMLElement[] = []

  Array.from(main.children).forEach(child => {
    const element = child as HTMLElement

    if (
      element.classList.contains('cv-section') &&
      element.querySelector('.experience-entry')
    ) {
      const heading = element.querySelector(':scope > h2')
      const entries = Array.from(
        element.querySelectorAll(':scope > .experience-entry'),
      ) as HTMLElement[]

      entries.forEach((entry, index) => {
        const block = document.createElement('section')

        block.className = 'cv-section pdf-export-block'

        if (index === 0 && heading) {
          block.appendChild(cloneElement(heading))
        }

        block.appendChild(cloneElement(entry))

        Object.assign(block.style, {
          width: '100%',
          margin: '0 0 8mm',
          padding: '0',
          boxSizing: 'border-box',
        })

        blocks.push(block)
      })

      return
    }

    const block = cloneElement(element)

    block.classList.add('pdf-export-block')

    blocks.push(block)
  })

  return blocks
}

function addHeader(page: HTMLElement, header: HTMLElement) {
  const headerClone = cloneElement(header)

  Object.assign(headerClone.style, {
    width: `${PAGE_WIDTH_MM}mm`,
    height: `${HEADER_HEIGHT_MM}mm`,
    minHeight: `${HEADER_HEIGHT_MM}mm`,
    margin: '0',
    boxSizing: 'border-box',
    breakInside: 'avoid',
    pageBreakInside: 'avoid',
  })

  page.appendChild(headerClone)
}

function addSidebarAndMain(
  page: HTMLElement,
  sidebar: HTMLElement,
  blocks: HTMLElement[],
  contentHeightMm: number,
) {
  const row = createContentRow(contentHeightMm)
  const sidebarClone = createSidebarClone(sidebar)
  const mainClone = createMainClone()

  row.appendChild(sidebarClone)
  row.appendChild(mainClone)
  page.appendChild(row)

  blocks.forEach(block => {
    mainClone.appendChild(block)
  })

  return {
    row,
    sidebarClone,
    mainClone,
  }
}

function createProfessionalExport(
  source: HTMLElement,
): HTMLElement {
  const header = source.querySelector('.cv-top') as HTMLElement | null
  const sidebar = source.querySelector('.cv-sidebar') as HTMLElement | null
  const main = source.querySelector('.cv-main') as HTMLElement | null

  if (!header || !sidebar || !main) {
    throw new Error('Professional CV layout could not be prepared for PDF export.')
  }

  const blocks = getMainBlocks(main)

  const exportRoot = document.createElement('div')

  exportRoot.className = 'pdf-professional-export-root'

  Object.assign(exportRoot.style, {
    position: 'fixed',
    left: '0',
    top: '0',
    width: `${PAGE_WIDTH_MM}mm`,
    margin: '0',
    padding: '0',
    background: '#ffffff',
    zIndex: '2147483647',
    boxSizing: 'border-box',
  })

  let currentPage = createPage()

  exportRoot.appendChild(currentPage)

  const firstContentHeight = PAGE_HEIGHT_MM - HEADER_HEIGHT_MM

  addHeader(currentPage, header)

  let currentLayout = addSidebarAndMain(
    currentPage,
    sidebar,
    [],
    firstContentHeight,
  )

  const pages: HTMLElement[] = [currentPage]

  const createNextPage = () => {

    currentPage = createPage()

    exportRoot.appendChild(currentPage)

    currentLayout = addSidebarAndMain(
      currentPage,
      sidebar,
      [],
      PAGE_HEIGHT_MM,
    )

    pages.push(currentPage)
  }

  blocks.forEach(block => {
    const candidate = cloneElement(block)

    currentLayout.mainClone.appendChild(candidate)

    const overflow =
      currentLayout.mainClone.scrollHeight >
      currentLayout.mainClone.clientHeight + 2

    if (overflow && currentLayout.mainClone.children.length > 1) {
      currentLayout.mainClone.removeChild(candidate)

      createNextPage()

      currentLayout.mainClone.appendChild(candidate)
    }
  })

  // Remove the forced page break from the last page.
  const lastPage = pages[pages.length - 1]

  if (lastPage) {
    lastPage.style.breakAfter = 'auto'
    lastPage.style.pageBreakAfter = 'auto'
  }

  return exportRoot
}

async function savePdf(root: HTMLElement, filename: string) {
  const options = createBaseOptions(filename)

  try {
    await html2pdf()
      .set(options)
      .from(root)
      .save()
  } finally {
    root.remove()
  }
}

async function downloadProfessionalPdf(
  element: HTMLElement,
  filename: string,
) {
  const exportRoot = createProfessionalExport(element)

  document.body.appendChild(exportRoot)

  // Allow the browser to finish layout before html2canvas measures
  // the explicit A4 page containers.
  await new Promise<void>(resolve => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve())
    })
  })

  await savePdf(exportRoot, filename)
}

export async function downloadCVPdf(
  element: HTMLElement,
  filename: string,
) {
  if (element.classList.contains('cv-professional')) {
    await downloadProfessionalPdf(element, filename)
    return
  }

  await savePdf(element, filename)
}
