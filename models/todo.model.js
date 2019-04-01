const mongoose = require('mongoose')
const User = require('./user.model')

const todoSchema = new mongoose.Schema({
  todo: { 
    type: String,
    required: true,
    maxLength: 120
  },
  tipo: {
    type: String,
    required: true,
    maxLength: 50
  },
  finalizado: {
    type: Boolean,
    required: true,
    default: false
  },
  dataEntrega: {
    type: Date,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

todoSchema.pre('remove', async function(next) {
  try {
      let user = await User.findById(this.userId)
      user.todo.remove(this.id)
      await user.save()

      return next()
  } catch(e) {
      return next(e)
  }
})

todoSchema.methods.toJSON = function() {
  const obj = this.toObject()
  obj['id'] = obj._id
  delete obj.__v
  delete obj._id
  return obj
}

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo