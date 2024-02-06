require('dotenv').config()
const express = require('express')
const app = express()
const port = 3001
const morgan = require('morgan')
const cors = require('cors')
const Entry = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms'
    ].join(' ')
  }))

app.get('/api/persons', (request, response) => {
    console.log('Getting all entries...')
    Entry.find({}).then(result => {
        response.json(result.map(person=>person.toJSON()))
      })
})

app.get('/api/persons/:id', (request, response, next) => {
    // console.log('request', request.params)
    console.log('id to find', request.params.id)
    Entry.findById(request.params.id).then(entry => {
        // console.log(entry)
        if (entry) {
            response.json(entry.toJSON())
        }
        else{
            response.status(404).end()
        }
      }).catch(error => next(error))
    // const singleEntry = phonebookEntries.find(entry => {
    //     console.log(entry.id, typeof entry.id, id, typeof id, entry.id === id)
    //     const matchID = entry.id.toString()
    //     return matchID === id
    //   })
    // if (singleEntry) {
    //     response.json(singleEntry)
    // }
    // else {
    //     response.status(404).end
    // }    
})

app.delete('/api/persons/:id', (request, response, next) => {
    console.log('id to find', request.params.id)
    Entry.findByIdAndDelete(request.params.id).then(() => {
        response.status(204).end()
    }).catch(error => next(error))
    // const id = Number(request.params.id)
    // const filteredEntries = phonebookEntries.filter(entry => entry.id !== id)
    // phonebookEntries = filteredEntries
    // response.status(204).end()
})

// const generateId = () => {
//     const max = 100
//     const newId = Math.floor(Math.random()* max)
//     console.log(newId)
//     return newId
// }

app.post('/api/persons', (request, response, next) => {
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

    // const findEntryByName = phonebookEntries.filter(entry => entry.name === body.name)
    // console.log(findEntryByName)
    // if (findEntryByName.length != 0) {
    //     return response.status(400).json({
    //         error: 'name must be unique.'
    //     })
    // }

    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    const newEntry = new Entry({
        name: body.name,
        number: body.number
    })

    newEntry.save()
    .then(savedEntry => savedEntry.toJSON())
    .then(savedAndFormattedPerson => {
        response.json(savedAndFormattedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    console.log('Updating by id...')
    const body = request.body
    const entryToUpdate = {
        name: body.name,
        number: body.number,
    }

    console.log('id to update', request.params.id)
    Entry.findByIdAndUpdate(request.params.id, entryToUpdate, { new: true })
        .then(updatedEntry => {
        response.json(updatedEntry.toJSON())
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)
}
app.use(errorHandler)

app.get('/info', (request, response) => {
    const currentDate = new Date().toLocaleString()
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    Entry.find({}).then(result => {
        response.send(`
        <div>
            <p>Phonebook has info for ${result.length} people.</p>
        </div>
        <div>
            <p>${currentDate} (${timeZone}) </p>
        </div>
    `)
      })
  })
  
const PORT = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})