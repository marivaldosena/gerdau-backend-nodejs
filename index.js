const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 5000
const HOST = process.env.IP || 'localhost'

app.use(cors())
app.use(bodyParser.json())

const todoRoutes = require('./routes/todo.routes')

app.use('/todos', todoRoutes)

app.use((req, res, next) => {
  res.status(404).send('Not Found')
})

app.listen(PORT, HOST, () => {
  console.log(`Executando em ${HOST}:${PORT}`)
})