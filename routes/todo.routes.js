const express = require('express')
const router = express.Router()
const handlers = require('../handlers/todo.handler')

router.route('/')
  .get(handlers.getAllTodos)
  .post(handlers.createTodo)

router.route('/:todoId')
  .get(handlers.getTodo)
  .put(handlers.updateTodo)
  .patch(handlers.updateTodo)
  .delete(handlers.deleteTodo)

module.exports = router