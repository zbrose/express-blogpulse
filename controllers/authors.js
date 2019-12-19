var express = require('express')
var db = require('../models')
var router = express.Router()

// GET /authors - display all authors
router.get('/', (req, res) => {
  db.author.findAll()
  .then(authors => {
    res.render('authors/index', { authors })
  })
  .catch(error => {
    res.status(400).render('main/404')
  })
})

// POST /authors - create a new author
router.post('/', (req, res) => {
  db.author.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    bio: req.body.bio
  })
  .then(author => {
    res.redirect('/authors')
  })
  .catch(error => {
    res.status(400).render('main/404')
  })
})

// GET /authors/new - display form for creating a new author
router.get('/new', (req, res) => {
  res.render('authors/new')
})

// GET /authors/:id - display a specific author and their posts
router.get('/:id', (req, res) => {
  db.author.find({
    where: { id: req.params.id },
    include: [db.post]
  })
  .then(author => {
    if (!author) throw Error()
    res.render('authors/show', { author })
  })
  .catch(error => {
    res.status(400).render('main/404')
  })
})

module.exports = router
