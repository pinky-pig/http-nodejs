const express = require('express')

const chromium = require('chrome-aws-lambda')
const playwright = require('playwright-core')

const router = express.Router()

async function tackScreenshot() {
  try {
    const path = await chromium.executablePath
    // eslint-disable-next-line no-console
    console.log(path, 'executablePath')

    const browser = await playwright.chromium.launch()
    const page = await browser.newPage()

    await page.goto('https://spacejelly.dev/')

    const title = await page.title()
    const description = await page.$eval('meta[name="description"]', element => element.content)

    await browser.close()

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: 'Ok',
        page: {
          title,
          description,
        },
      }),
    }
  }
  catch (error) {
    console.error(error)
  }
}

router.get('/site', async (req, res) => {
  const response = await tackScreenshot()
  res.send(response)
})

module.exports = router
