const dummy = (blogs) => {
    if (blogs) {
        return 1
    }
}

const totalLikes = (blogs) => {
    let sumLikes = 0
    blogs.map(blog => {
        console.log(blog)
        sumLikes = blog.likes + sumLikes})
    return sumLikes
}

const favouriteBlog = (blogs) => {
    let faveBlog = {
        "title": blogs[0].title,
        "author": blogs[0].author,
        "likes": blogs[0].likes
      }
    blogs.map(blog => {
        if (blog.likes > faveBlog.likes) {
            faveBlog = {
                "title": blog.title,
                "author": blog.author,
                "likes": blog.likes
              }
        }
    })
    console.log(faveBlog)
    return faveBlog
}

const authorMostBlogs = (blogs) => {
    const authorCount = {}
    blogs.forEach(blog => {
        const {author} = blog
        authorCount[author] = (authorCount[author]||0) + 1
    })
    let mostBlogsAuthor = ''
    let mostNumberOfBlogs = 0
    Object.entries(authorCount).forEach(([author,count]) => {
        if (count>mostNumberOfBlogs) {
            mostBlogsAuthor = author
            mostNumberOfBlogs = count
        }
    })
    const result = {"author": mostBlogsAuthor, "blogs": mostNumberOfBlogs}
    return result
}

const authorMostLikes = (blogs) => {
    const likesByAuthor = {}
    blogs.forEach(blog => {
        const {author, likes} = blog
        likesByAuthor[author] = (likesByAuthor[author]||0) + likes
    })
    let mostLikesAuthor = ''
    let mostLikesCount = 0
    Object.entries(likesByAuthor).forEach(([author,likes]) => {
        if (likes>mostLikesCount) {
            mostLikesAuthor = author
            mostLikesCount = likes
        }
    })
    const result = {"author": mostLikesAuthor, "likes": mostLikesCount}
    return result
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    authorMostBlogs,
    authorMostLikes
}