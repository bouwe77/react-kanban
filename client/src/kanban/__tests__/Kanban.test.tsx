import 'whatwg-fetch'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { v4 as uuidv4 } from 'uuid'
import Kanban from '../Kanban'
import { TaskType } from '../../types'

// These are the in-memory tasks
let tasks: Array<TaskType>

const server = setupServer(
  rest.get('http://localhost:5442/tasks', (_, res, ctx) => {
    return res(ctx.json(tasks))
  }),
  rest.post('http://localhost:5442/tasks', (req, res, ctx) => {
    // For now, create a hard-coded task as long as the form is not ready
    const newTask = { id: uuidv4(), title: 'piet', column: 0 }
    tasks.push(newTask)

    return res(ctx.json(newTask))
  }),
)

beforeAll(() => {
  tasks = []
  server.listen({ onUnhandledRequest: 'error' })
})

afterAll(() => {
  tasks = []
  server.close()
})

afterEach(() => server.resetHandlers())

test('Create task', async () => {
  render(<Kanban />)

  await waitFor(() => {
    const toDoColumn = screen.getByText(/to do/i)
    expect(toDoColumn).toBeInTheDocument()
  })

  const createButton = screen.getByRole('button', {
    name: 'Create task in column TO DO',
  })
  user.click(createButton)

  const saveButton = screen.getByRole('button', {
    name: /save/i,
  })
  user.click(saveButton)

  await waitFor(() => {
    const loading = screen.getByText(/loading/i)
    expect(loading).toBeInTheDocument()
  })

  await waitFor(() => {
    const createdTask = screen.getByText(/piet/i)
    expect(createdTask).toBeInTheDocument()
  })
})
