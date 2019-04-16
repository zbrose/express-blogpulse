var express = require('express')
var db = require('../models')
var router = express.Router()

router.post('/', (req, res) => {
  res.send(req.body)
})

module.exports = router
