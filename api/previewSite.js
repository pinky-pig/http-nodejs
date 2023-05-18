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

    await browser.close()

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: 'Ok',
        page: {
          title,
          description,
          buffer: screenshot,
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
