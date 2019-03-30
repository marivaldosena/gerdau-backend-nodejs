const mongoose = require('mongoose')

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