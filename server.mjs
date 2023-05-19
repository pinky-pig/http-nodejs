import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import dotenv from 'dotenv'
import PreviewRoute from './api/previewSite.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// axios接口数据。axios数据请求方式x-www-form-urlencoded
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'content-type')
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
  if (req.method.toLowerCase() === 'options')
    res.send(200) // 让options尝试请求快速结束
  else
    next()
})

app.use('/static', express.static(path.join(__dirname, '/static/')))
app.use('/preview', PreviewRoute)

app.listen(process.env.PORT, (req, res) => {
  // eslint-disable-next-line no-console
  console.log(`express start port ${process.env.PORT}`)
})
