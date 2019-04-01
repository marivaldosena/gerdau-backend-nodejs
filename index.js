const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth.routes')
const { loginRequired, ensureCorrectUser } = require('./middlewares/auth.middleware')

const PORT = process.env.PORT || 5000
const HOST = process.env.IP || 'localhost'

app.use(cors())
app.use(bodyParser.json())

const todoRoutes = require('./routes/todo.routes')

app.use('/todos', todoRoutes)
app.use('/auth', authRoutes)

app.get('/todos', loginRequired, async function(req, res, next) {
  try {
      let todos = await db.Todo.find()
          .sort({ createdAt: 'DESC' })
          .populate('user', {
              username: true
          })
      
      return res.status(200).json(todos)
  } catch (e) {
      return next(e)
  }
})

app.use((req, res, next) => {
  res.status(404).send('Not Found')
})

app.listen(PORT, HOST, () => {
  console.log(`Executando em ${HOST}:${PORT}`)
})