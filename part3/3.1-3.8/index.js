const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())
morgan.token('req-body', (req) => {
    return JSON.stringify(req.body)
})
app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens['req-body'](req)
    ].join(' ')
  }))
const PORT = 3001
let phoneData = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateID = () => {
    return Math.floor(Math.random() * 69420)
}

app.get('/api/persons', (req, res) =>{
    res.json(phoneData)
})

app.get('/info', (req, res) => {
    const currentDate = new Date().toString()
    res.send(`<p>Phonebook has info for ${phoneData.length} people</p> <br /> <p>${currentDate}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const contact = phoneData.find(person => person.id === id)
    if ( contact ) {
        res.json(contact)
    } else {
        return res.status(400).json({error: 'content missing'})
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    phoneData = phoneData.filter(contact => contact.id !== id)
    console.log('Operation successful.')
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    const nameExists = phoneData.some(person => person.name === body.name)
    if (!body.name || !body.number) {
        return res.status(400).json({ error: 'name or number is missing' })
    }

    if (nameExists) {
        return res.status(400).json({ error: 'name already exists' })
    }

    const contact = {
        id: generateID(),
        name: body.name,
        number: body.number
    }

    phoneData = phoneData.concat(contact)
    //console.log(contact)
    res.json(contact)
})

app.listen(PORT, (req, res) => {
    console.log(`Server running on port ${PORT}`)
})
