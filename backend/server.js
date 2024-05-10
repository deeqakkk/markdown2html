const express = require('express')
const bodyParser = require('body-parser')
const showdown = require('showdown')
const cors = require('cors')

const app = express()
const port = 3001

app.use(cors())

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send(`Hello World- ${new Date().toTimeString()}`)
})

app.post('/convert', (req, res) => {
  const { markdown } = req.body
  console.log(markdown)
  const convertor = new showdown.Converter()

  const html = convertor.makeHtml(markdown)

  res.send({ html })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
