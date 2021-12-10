import React from "react"
import { render, fireEvent, prettyDOM } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from "./BlogForm"

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const form = component.container.querySelector('form')

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  //console.log(prettyDOM(title))

  fireEvent.change(title, {
    target: { value: 'AGOT' }
  })
  fireEvent.change(author, {
    target: { value: 'GRRM' }
  })
  fireEvent.change(url, {
    target: { value: 'asoaif.com' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('AGOT')
  expect(createBlog.mock.calls[0][0].author).toBe('GRRM')
  expect(createBlog.mock.calls[0][0].url).toBe('asoaif.com')
})
