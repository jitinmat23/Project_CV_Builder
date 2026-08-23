import express from 'express'
import { chromium } from 'playwright'

const app = express()
const PORT = 3001

app.use(express.json({ limit: '30mb' }))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204)
  }

  next()
})

app.get('/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/pdf', async (req, res) => {
  const { html, head, filename } = req.body

  if (!html) {
    return res.status(400).send('Missing CV HTML')
  }

  let browser

  try {
    browser = await chromium.launch({ headless: true })

    const page = await browser.newPage({
      viewport: {
        width: 1200,
        height: 1600,
      },
      deviceScaleFactor: 1,
    })

    const documentHtml = `<!doctype html>
<html>
<head>
  <meta charset="UTF-8" />
  <base href="http://localhost:5173/" />
  ${head || ''}

  <!-- This MUST be the last @page rule so the imported app CSS
       cannot override the PDF margins. -->
  <style id="pdf-page-settings">
    @page {
      size: A4;
      margin: 8mm 10mm 8mm 10mm !important;
    }

    html,
    body {
      margin: 0 !important;
      padding: 0 !important;
      background: #fff;
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    body {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    /* The printable area is already reduced by @page margins.
       Do not add another outer margin here. */
    .cv {
      margin-top: 0 !important;
      margin-bottom: 0 !important;
    }
  </style>
</head>
<body>
  ${html}
</body>
</html>`

    await page.setContent(documentHtml, {
      waitUntil: 'networkidle',
    })

    await page.evaluate(async () => {
      if (document.fonts?.ready) {
        await document.fonts.ready
      }

      const images = Array.from(document.images)

      await Promise.all(
        images.map((image) => {
          if (image.complete) return Promise.resolve()

          return new Promise((resolve) => {
            image.addEventListener('load', resolve, { once: true })
            image.addEventListener('error', resolve, { once: true })
          })
        }),
      )
    })

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      // Keep margins in @page above. This prevents Playwright's PDF
      // margin handling from fighting the application's print CSS.
    })

    const safeFilename =
      typeof filename === 'string' && filename.trim()
        ? filename.trim().replace(/"/g, '')
        : 'cv.pdf'

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${safeFilename}"`,
    )

    res.send(pdf)
  } catch (error) {
    console.error('PDF generation failed:', error)

    res.status(500).send(
      error instanceof Error
        ? error.message
        : 'PDF generation failed',
    )
  } finally {
    if (browser) {
      await browser.close()
    }
  }
})

app.listen(PORT, () => {
  console.log(
    `CV Builder PDF server running at http://localhost:${PORT}`,
  )
})
