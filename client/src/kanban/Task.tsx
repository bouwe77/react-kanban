import { ReactNode } from 'react'

export default function Task({
  id,
  children,
  updateTask,
  deleteTask,
}: {
  id: string
  children: ReactNode
  updateTask: ReactNode
  deleteTask: ReactNode
}) {
  return (
    <div
      id={id}
      style={{
        backgroundColor: 'lightgray',
        border: '1px solid darkgrey',
        width: '195px',
        minHeight: '20px',
        margin: '2px',
      }}
      draggable={true}
    >
      {children}
      {updateTask}
      {deleteTask}
    </div>
  )
}
