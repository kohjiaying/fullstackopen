const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('cleared')

    // helper.initialBlogs.forEach(async (blog) => {
    //     let blogObject = new Blog(blog)
    //     await blogObject.save()
    //     console.log('saved')
    // })
    // console.log('done')
    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct number of blogs returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('the unique identifier property of the blog posts is by default _id', async () => {
    const blogs = await Blog.find({})
    expect(blogs[0]._id).toBeDefined()
})

test('a valid blog can be added', async () => {    
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'root',
      url: 'www.root.com',
      likes: 1
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
        'async/await simplifies making async calls'
      )
})

test('likes default to 0', async () => {
    const initialBlogs = await api.get('/api/blogs')
    const newBlog = {
        title: 'likes default to 0',
        author: 'title is missing',
        url: 'www.test.com'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)

    const blogsAtEnd = await helper.blogInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length+1)
    console.log('blogs after adding', blogsAtEnd)
    const blogJustAdded = blogsAtEnd[blogsAtEnd.length-1]
    console.log('blog just added', blogJustAdded)
    expect(blogJustAdded.likes).toBe(0)
})

test('blog without title is not added', async () => {
    const initialBlogs = await api.get('/api/blogs')
    console.log('initial number of posts', initialBlogs.body.length)
    const newBlog = {
        author: 'title is missing',
        url: 'www.root.com',
        likes: 1
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})


test('blog without url is not added', async () => {
    const initialBlogs = await api.get('/api/blogs')
    console.log('initial number of posts', initialBlogs.body.length)
    const newBlog = {
        title : 'url is missing',
        author: 'tester',
        likes: 1
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogInDb()
  
    const blogToView = blogsAtStart[0]
  
  
    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    expect(resultBlog.body).toEqual(blogToView)
})
  
test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  
    const blogsAtEnd = await helper.blogInDb()
  
    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )
  
    const titles = blogsAtEnd.map(r => r.title)
  
    expect(titles).not.toContain(blogToDelete.title)
})

test('blog can be updated', async () => {
    const initialBlogs = await api.get('/api/blogs')
    console.log('initial number of posts', initialBlogs.body.length)
    const updateBlog = {
        title: "A lonely night",
        author: "James Martin",
        url: "www.blogShare.com/aLonelyNight",
        likes: 334,
        id: "65c2df64e175db0fc5a61f72"
    }

    await api
        .put('/api/blogs/65c2df64e175db0fc5a61f72')
        .send(updateBlog)
        .expect(201)

    const blogsAtEnd = await helper.blogInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    const resultBlog = await api
      .get(`/api/blogs/65c2df64e175db0fc5a61f72`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    expect(resultBlog.body).toEqual(updateBlog)

})
  
afterAll(async () => {
  await mongoose.connection.close()
})