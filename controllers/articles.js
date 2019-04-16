var express = require('express')
var db = require('../models')
var router = express.Router()

// POST /articles - create a new post
router.post('/', function(req, res) {
  db.article.create({
    title: req.body.title,
    content: req.body.content,
    authorId: req.body.authorId
  })
  .then(function(post) {
    res.redirect('/')
  })
  .catch(function(error) {
    res.status(400).render('main/404')
  })
})

// GET /articles/new - display form for creating new articles
router.get('/new', function(req, res) {
  db.author.findAll()
  .then(function(authors) {
    res.render('articles/new', { authors: authors })
  })
  .catch(function(error) {
    res.status(400).render('main/404')
  })
})

// GET /articles/edit/:id - display edit form for articles
router.get('/edit/:id', (req, res) => {
  db.article.findOne({
    where: { id: req.params.id }
  })
  .then((foundArticle) => {
    db.author.findAll()
    .then((authors) => {
      res.render('articles/edit', {
        article: foundArticle,
        authors: authors
      })
    })
    .catch((err) => {
      console.log(err)
      res.render('main/404')
    })
  })
  .catch((err) => {
    console.log('Error in /articles/edit/:id', err)
    res.render('main/404')
  })
})

// GET /articles/:id - display a specific post and its author
router.get('/:id', function(req, res) {
  db.article.findOne({
    where: { id: req.params.id },
    include: [db.author, db.comment]
  })
  .then(function(article) {
    if (!article) throw Error()
    console.log(article.author)
    res.render('articles/show', { article: article })
  })
  .catch(function(error) {
    console.log(error)
    res.status(400).render('main/404')
  })
})

module.exports = router
