require('dotenv').config()

// let PORT = process.env.PORT
let PORT = 3003
const password = 'wqaL1iFwMpt9mJrD'
const encodedPassword = encodeURIComponent(password)
const uri = `mongodb+srv://jay2000lene:${encodedPassword}@cluster0.jlsyu0q.mongodb.net/bloglist?retryWrites=true&w=majority`
// let MONGODB_URI = process.env.MONGODB_URI
// const MONGODB_URI = process.env.NODE_ENV === 'test' 
//   ? process.env.TEST_MONGODB_URI
//   : process.env.MONGODB_URI
const testuri = `mongodb+srv://jay2000lene:${encodedPassword}@cluster0.jlsyu0q.mongodb.net/testbloglist?retryWrites=true&w=majority`
const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? testuri
  : uri

const SECRET = "SECRET"

module.exports = {
  MONGODB_URI,
  PORT,
  SECRET
}