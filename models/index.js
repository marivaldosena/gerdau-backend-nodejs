const mongoose = require('mongoose')

mongoose.Promise = Promise

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/gerdau-todos', {
  keepAlive: true,
  useNewUrlParser: true,
  useCreateIndex: true
})

module.exports.Todo = require('./todo.model')
module.exports.User = require('./user.model')