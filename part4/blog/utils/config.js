require('dotenv').config()

// let PORT = process.env.PORT
let PORT = 3003
const password = '2000!@#$Password'
const encodedPassword = encodeURIComponent(password)
const uri = `mongodb+srv://jay2000lene:${encodedPassword}@cluster0.jlsyu0q.mongodb.net/bloglist?retryWrites=true&w=majority`
// let MONGODB_URI = process.env.MONGODB_URI
let MONGODB_URI = uri

module.exports = {
  MONGODB_URI,
  PORT
}