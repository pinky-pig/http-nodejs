const express = require('express')
const router = express.Router()

const chromium = require('chrome-aws-lambda');
const playwright = require('playwright-core');

async function tackScreenshot() {
  try {
    const browser = await playwright.chromium.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath || "C:/Program Files/Google/Chrome/Application/chrome.exe",
      headless: true, //设置为true，即无头模式
    });
    const page = await browser.newPage();
    
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
  } catch (error) {
    console.error(error);
  }
}

router.get('/site', async function (req, res) {
  const response = await tackScreenshot()
  res.send(response)
})

module.exports = router
