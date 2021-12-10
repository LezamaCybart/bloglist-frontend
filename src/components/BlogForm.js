import React, { useState } from 'react'
const BlogForm = ({ createBlog }) => {
  const [newAuthor, setNewAuthor] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewUrl('')
    setNewTitle('')
    setNewAuthor('')
  }

  return (
    <form onSubmit={addBlog}>
      title
      <input
        id='title'
        value={newTitle}
        onChange={handleTitleChange}
      />
      author
      <input
        id='author'
        value={newAuthor}
        onChange={handleAuthorChange}
      />
      url
      <input
        id='url'
        value={newUrl}
        onChange={handleUrlChange}
      />
      <button type="submit">add Blog</button>
    </form>
  )

}

export default BlogForm
