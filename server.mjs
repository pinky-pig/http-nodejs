import express from 'express'
import PreviewRoute from './api/previewSite.js'

const app = express()

// axios接口数据。axios数据请求方式x-www-form-urlencoded
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/preview', PreviewRoute)

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'content-type')
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
  if (req.method.toLowerCase() === 'options')
    res.send(200) // 让options尝试请求快速结束
  else
    next()
})

app.listen(process.env.PORT || 3200, (req, res) => {
  // eslint-disable-next-line no-console
  console.log('express start port 3200')
})
