import React, {useState} from 'react'
const Blog = ({blog}) => {

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
        </p>
        <p>
        {blog.author}
        </p>
      </div>
    </div>  
  )

}

export default Blog
