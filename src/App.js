import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Toggleable'
import BlogForm from './components/BlogForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = useRef()


  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a,b) => b.likes - a.likes)
      setBlogs(blogs)
    }
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const deleteBlog = (id) => {
    blogService
      .deleteB(id)
      .then(returnedBlog => {
        setBlogs(blogs.filter(blog => blog.id !==  id))
      })
  }

  const updateBlog = (id, blogObject) => {
    blogService
      .update(id, blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id === returnedBlog.id ? returnedBlog : blog))
      })
  }
  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        handleNewBlogNotif()
      })
  }
  const handleNewBlogNotif = () => {
    setErrorMessage(`${blogs.at(-1).title} by author ${blogs.at(-1).author} was added`) //FIX
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const tokenStored = window.localStorage.getItem('loggedBlogappUser')
  if (tokenStored !== null) {
    const token = JSON.parse(tokenStored).token
    blogService.setToken(token)
    console.log(token)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  if (user === null) {
    return (
      <div>
      <Notification message={errorMessage}/>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
      <button type="submit">login</button>
      </form>
      </div>
    )
  }
  return (
    <div>
      <Notification message={errorMessage}/>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>
      <button onClick={handleLogOut}>logout</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} updateBlog={updateBlog}/>
      )}
    </div>
  )
}

export default App
