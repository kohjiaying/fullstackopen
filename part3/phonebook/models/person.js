require('dotenv').config()
const mongoose = require('mongoose')
const password = process.argv[2]
const encodedPassword = encodeURIComponent(password)
const uri = `mongodb+srv://jay2000lene:${encodedPassword}@cluster0.jlsyu0q.mongodb.net/phonebook?retryWrites=true&w=majority`

console.log('connecting to', uri)

mongoose.connect(uri).then(result => {
    console.log('connected to MongoDB')
    })
    .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
})

const numberValidators = [
    {
        // minimum length
        validator: (number) => {
            if ((number[2] === '-' || number[3] === '-') && number.length < 9) {
                return false
            }
            return true
        },
        msg: 'must be at least 8 digits',
    },
    {
        //allow only numbers
        validator: (number) => {
            return /^\d{2,3}-\d+$/.test(number)
        },
        msg: 'invalid phone number'
    }
]

const entrySchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        validate: numberValidators,
        required: true
    }
})
entrySchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Entry', entrySchema)

// if (process.argv.length === 5) {
//     const Entry = mongoose.model('Entry', entrySchema)
//     console.log('adding new user...')
//     const generateId = () => {
//         const max = 100
//         const newId = Math.floor(Math.random()* max)
//         console.log(newId)
//         return newId
//     }
//     const newEntry = new Entry({
//         id: generateId(),
//         name: process.argv[3],
//         number: process.argv[4]
//     })
    
//     newEntry.save().then(result => {
//         console.log('Entry added to phonebook!')
//         console.log('result', result)
//         mongoose.connection.close()
//     })
//     console.log(`added ${process.argv[3]} ${process.argv[4]} to phonebook`)
// }

// if (process.argv.length === 3) {
//     console.log('retrieving all entries...')
//     Entry.find({}).then(result => {
//         console.log('phonebook')
//         result.forEach(entry => {
//           console.log(entry.name, entry.number)
//         })
//         mongoose.connection.close()
//     })
// }

// console.log(process.argv.length)