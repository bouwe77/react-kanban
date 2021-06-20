import Modal from '../shared/Modal'
import { useCreateTask } from '../hooks/tasks'
import { v4 as uuidv4 } from 'uuid'
import { ColumnType } from '../types'

export default function CreateTask({
  column,
  onCreated,
}: {
  column: ColumnType
  onCreated: () => void
}) {
  const { save } = useCreateTask()

  async function handleSave() {
    const id = uuidv4()
    await save({
      id,
      title: id,
      column,
    })
    onCreated()
  }

  return (
    <Modal>
      <>
        <h1>Create task</h1>

        <label htmlFor="title">Title</label>
        <input id="title" type="text" />

        <br />
        <button onClick={handleSave}>Save</button>
      </>
    </Modal>
  )
}
