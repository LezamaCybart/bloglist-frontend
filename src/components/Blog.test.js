import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, prettyDOM } from '@testing-library/react'
import Togglable from "./Toggleable"
import Blog from "./Blog"


describe('toggleable behavior', () => {
  let component

  const blog = {
    title: 'ASOS',
    author: 'GRRM',
    url: 'asoaif.com',
    likes: 2
  }

  const mockHandler = jest.fn()
  beforeEach(() => {
    component = render(
      <Blog blog={blog} updateBlog={mockHandler} deleteBlog={mockHandler}/>
    )
  })
  /*
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
  const  component = render(
    <Togglable buttonLabel="show...">
      <Blog blog={blog} updateBlog={mockHandler} deleteBlog={mockHandler}/>
    </Togglable>
  )
  //console.log(prettyDOM())
  component.debug()
  */

  test('render children', () => {
    expect(
      component.container.querySelector('.blog')
    ).not.toBe(null)
  })

  test('at start, title is displayed but likes are not', () => {
    const titleDiv = component.container.querySelector('.titleDiv')
    const infoDiv = component.container.querySelector('.infoDiv')

    expect(titleDiv).toHaveTextContent('ASOS')
    expect(titleDiv).toHaveStyle('display: block')
    expect(infoDiv).toHaveStyle('display: none')
  })

  test('blog info is shown when toggle button  is clicked', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const infoDiv = component.container.querySelector('.infoDiv')
    expect(infoDiv).toHaveStyle('display: block')
  })

})
test('clicking like button twice makes prop function get called twice', () => {
  const blog = {
    user: "userid",
    title: 'ASOS',
    author: 'GRRM',
    url: 'asoaif.com',
    likes: 2
  }

  const mockHandler = jest.fn()
  const updateText = jest.fn()

  const component = render(
    <Blog blog={blog} updateBlog={updateText} deleteBlog={mockHandler}/>
  )


  const likeButton = component.getByText('like')
  console.log(prettyDOM(likeButton))
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(updateText.mock.calls).toHaveLength(2)
})
