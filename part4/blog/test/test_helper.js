const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        "title": "One beautiful morning",
        "author": "Jessie Low",
        "url": "www.blogpost.com/oneBeautifulMorning",
        "likes": 10,
        "id": "65c2dec6d96d01194558c6f4"
    },
    {
        "title": "A lonely night",
        "author": "James Martin",
        "url": "www.blogShare.com/aLonelyNight",
        "likes": 34,
        "id": "65c2df64e175db0fc5a61f72"
    },
    {
        "title": "Having a great lunch",
        "author": "Paul Houten",
        "url": "www.blogSpot.com/havingAGreatLunch",
        "likes": 105,
        "id": "65c2e6d8b3355ba0949c6a87"
    }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()
  return blog._id.toString()
}

const blogInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogInDb,
  usersInDb,
}
