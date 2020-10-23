const db = require('./models')
const comment = require('./models/comment')

// db.author.create({
//   firstName: 'Steve',
//   lastName: 'Peters',
//   bio: 'Sold his soul to big daddy bezos, but he always comes back to GA'
// }).then(author=>console.log('💪 Winning'))

// db.comment.create({
//   name: 'Paul Allen',
//   content: 'This is really neat! Thanks for posting.',
//   articleId: 1
// })
// .then(function(comment) {
//   console.log(comment.get())
// })

db.article.findOne({
  where: { id: 1 }
}).then(function(article) {
  // by using eager loading, the article model should have a comments key
  
  article.addComment(db.comment.create({
    name: "Mutt Buncher",
    content: "Wow, so cool love local newz",
    articleId: article.id
  }))
})