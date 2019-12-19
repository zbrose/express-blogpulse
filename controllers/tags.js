var express = require('express')
var db = require('../models')
var router = express.Router()

router.get('/', (req, res) => {
  db.tag.findAll()
  .then(tags => {
    res.render('tags/index', { tags })
  })
  .catch(err => {
    console.log(err)
    res.render('main/404')
  })
})

router.get('/:id', (req, res) => {
  db.tag.findOne({
    where: { id: req.params.id },
    include: [db.article]
  })
  .then(tag => {
    res.render('tags/show', { tag })
  })
  .catch(err => {
    console.log(err)
    res.render('main/404')
  })
})

module.exports = router
