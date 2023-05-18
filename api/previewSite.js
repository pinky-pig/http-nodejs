const { Buffer } = require('node:buffer')
const express = require('express')

const playwright = require('playwright-core')

const router = express.Router()

async function tackScreenshot(url) {
  if (!url) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Page URL not defined' }),
    }
  }

  try {
    const browser = await playwright.chromium.launch()
    const page = await browser.newPage()

    await page.goto(url)

    const title = await page.title()
    const description = await page.$eval('meta[name="description"]', element => element.content)
    const screenshot = await page.screenshot({ encoding: 'binary' })
    const base64String = Buffer.from(screenshot).toString('base64')

    await browser.close()

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: 'Ok',
        page: {
          title,
          description,
          buffer: screenshot,
          base64String: `data:image/previewSite.jpeg;base64,${base64String}`,
        },
      }),
    }
  }
  catch (error) {
    return {
      statusCode: 200,
      body: JSON.stringify(error),
    }
  }
}

router.get('/site', async (req, res) => {
  const response = await tackScreenshot(req.query?.url)
  res.send(response)
})

module.exports = router
