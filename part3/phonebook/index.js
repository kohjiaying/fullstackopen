const express = require('express')
const app = express()
const port = 3001
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms'
    ].join(' ')
  }))

let phonebookEntries = [
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

app.get('/api/persons', (request, response) => {
    response.json(phonebookEntries)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    console.log(id)
    const singleEntry = phonebookEntries.find(entry => {
        console.log(entry.id, typeof entry.id, id, typeof id, entry.id === id)
        const matchID = entry.id.toString()
        return matchID === id
      })
    if (singleEntry) {
        response.json(singleEntry)
    }
    else {
        response.status(404).end
    }    
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const filteredEntries = phonebookEntries.filter(entry => entry.id !== id)
    phonebookEntries = filteredEntries
    response.status(204).end()
})

const generateId = () => {
    const max = 100
    const newId = Math.floor(Math.random()* max)
    console.log(newId)
    return newId
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body)

    if (Object.keys(body).length === 0) {
        return response.status(400).json({ 
          error: 'body missing' 
        })
      }
    
    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }

    const findEntryByName = phonebookEntries.filter(entry => entry.name === body.name)
    console.log(findEntryByName)
    if (findEntryByName.length != 0) {
        return response.status(400).json({
            error: 'name must be unique.'
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    const newEntry = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    phonebookEntries = phonebookEntries.concat(newEntry)
    response.json(newEntry)
})

app.get('/info', (request, response) => {
    const currentDate = new Date().toLocaleString()
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    response.send(`
        <div>
            <p>Phonebook has info for ${phonebookEntries.length} people.</p>
        </div>
        <div>
            <p>${currentDate} (${timeZone}) </p>
        </div>
    `)
  })
  
const PORT = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})