import { ReactNode } from 'react'
import DragAndDrop from '../shared/DragAndDrop'

export default function Column({
  title,
  children,
  create,
  handleMoveTask,
}: {
  title: String
  children?: ReactNode
  create: ReactNode
  handleMoveTask: (taskId: string) => void
}) {
  function handleOnDrop(taskId: string) {
    handleMoveTask(taskId)
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '10px',
        }}
      >
        <div>
          <h1 style={{ display: 'inline' }}>{title}</h1>
        </div>
        <div>{create}</div>
      </div>
      <DragAndDrop
        style={{
          border: '1px solid gray',
          width: '200px',
          minHeight: '200px',
          margin: '10px',
          padding: '2px',
        }}
        onDropCallback={handleOnDrop}
      >
        {children}
      </DragAndDrop>
    </div>
  )
}
