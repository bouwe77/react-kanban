import { render, screen } from '@testing-library/react'
import App from './App'

test('renders My Kanban title', () => {
  render(<App />)
  const linkElement = screen.getByText(/my kanban/i)
  expect(linkElement).toBeInTheDocument()
})
