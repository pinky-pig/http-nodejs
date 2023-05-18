const express = require('express')
const router = express.Router()

router.get('/site', function (req, res) {
  res.send('hello world')
})

module.exports = router
