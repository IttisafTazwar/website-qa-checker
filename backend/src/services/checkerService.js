import { chromium } from 'playwright'
import * as cheerio from 'cheerio'

const checkWebsite = async (url) => {
  const results = {
    brokenLinks: [],
    consoleErrors: [],
    accessibilityIssues: [],
    metaTags: {
      title: '',
      description: '',
      ogImage: '',
    },
    performance: {
      loadTime: 0,
    }
  }

  const browser = await chromium.launch()
  const page = await browser.newPage()

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      results.consoleErrors.push(msg.text())
    }
  })

  const startTime = Date.now()

  try {
    const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
    results.performance.loadTime = Date.now() - startTime

    const html = await page.content()
    const $ = cheerio.load(html)

    results.metaTags.title = $('title').text() || ''
    results.metaTags.description = $('meta[name="description"]').attr('content') || ''
    results.metaTags.ogImage = $('meta[property="og:image"]').attr('content') || ''

    const links = []
    $('a[href]').each((_, el) => {
      const href = $(el).attr('href')
      if (href && href.startsWith('http')) {
        links.push(href)
      }
    })

    for (const link of links.slice(0, 20)) {
      try {
        const res = await page.request.get(link, { timeout: 10000 })
        if (!res.ok()) {
          results.brokenLinks.push({ link, statusCode: res.status() })
        }
      } catch {
        results.brokenLinks.push({ link, statusCode: 0 })
      }
    }

    $('img').each((_, el) => {
      if (!$(el).attr('alt')) {
        results.accessibilityIssues.push({
          type: 'missing-alt-text',
          description: `Image missing alt text: ${$(el).attr('src') || 'unknown'}`,
        })
      }
    })

    $('input').each((_, el) => {
      const id = $(el).attr('id')
      if (id && !$(`label[for="${id}"]`).length) {
        results.accessibilityIssues.push({
          type: 'missing-label',
          description: `Input field missing label: id="${id}"`,
        })
      }
    })

  } catch (error) {
    results.consoleErrors.push(`Page load error: ${error.message}`)
  } finally {
    await browser.close()
  }

  return results
}

export default checkWebsite