const db = require('./models')

db.author.create({
  firstName: 'Steve',
  lastName: 'Peters',
  bio: 'Sold his soul to big daddy bezos, but he always comes back to GA'
}).then(author=>console.log('💪 Winning'))