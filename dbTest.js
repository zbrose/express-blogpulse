const db = require('./models')

db.comment.create({
  name: 'Paul Allen',
  content: 'This is really neat! Thanks for posting.',
  articleId: 1
})
.then(comment => {
  console.log(comment.get())
})


const createComment = async () => {
  try {
    const newComment = await db.comment.create({
      name: 'Ada Lovelace',
      content: 'So excited for this!',
      articleId: 2
    })
    console.log(newComment)
  } catch (err) {
    console.log(err)
  }
}

createComment()