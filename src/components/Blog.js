import React, {useState} from 'react'
const Blog = ({blog, updateBlog, deleteBlog}) => {
  /*
  const usern = JSON.stringify(user)
  console.log(usern)
  const getUser = async (blog) => {
    const user = await blog.user
    if (user !== undefined) {
      const username = await user.username
      blog.user = username
    }
  }
  getUser(blog)
  console.log(blog.user)
  */

  const removeBlog = () => {
    if(window.confirm(`remove ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id)
    }
  }

  const likePost = (user) => {
    const newBlog = {
      user: user.id,
      likes: (blog.likes + 1),
      title: blog.title,
      author: blog.author
    }
    updateBlog(blog.id, newBlog)
  }

  const [infoVisible, setInfoVisible] = useState(false)

  const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
  }
  const hideWhenVisible = { display: infoVisible ? 'none' : '' }
  const showWhenVisible = { display: infoVisible ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <p>
          {blog.title} 
          <button onClick={() => setInfoVisible(true)}>view</button>
        </p>
      </div>
      <div style={showWhenVisible}>
        <p>
        {blog.title} 
        <button onClick={() => setInfoVisible(false)}>hide</button>
        </p>
        <p>
        {blog.url} 
        </p>
        <p>
        likes: {blog.likes} 
        <button onClick={() => likePost(blog.user)}>like</button>
        </p>
        <p>
        {blog.author}
        </p>
        <p>
        <button onClick={() => removeBlog()}>remove</button>
        </p>
      </div>
    </div>  
  )

}

export default Blog
