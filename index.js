let express = require('express')
let ejsLayouts = require('express-ejs-layouts')
let moment = require('moment')
let app = express()
let db = require('./models')

app.set('view engine', 'ejs')
app.use(require('morgan')('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(ejsLayouts)
app.use(express.static(__dirname + '/public/'))
/* middleware that allows us to access the 'moment' library
 * in every single EJS view, without having to define it
 */
app.use((req, res, next) => {
  res.locals.moment = moment
  next()
})

// GET / - display all posts and their authors
app.get('/', function(req, res) {
  db.article.findAll({
    include: [db.author]
  })
  .then(articles => {
    res.render('main/index', { articles })
  })
  .catch(err => {
    console.log(err)
    res.status(400).render('main/404')
  })
})

// bring in authors and posts controllers
app.use('/authors', require('./controllers/authors'))
app.use('/articles', require('./controllers/articles'))
app.use('/tags', require('./controllers/tags'))

var server = app.listen(process.env.PORT || 3000)

module.exports = server
