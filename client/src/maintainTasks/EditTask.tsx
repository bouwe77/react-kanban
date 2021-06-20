import Modal from '../shared/Modal'
import { useTask, useUpdateTask } from '../hooks/tasks'
import { v4 as uuidv4 } from 'uuid'

export default function EditTask({
  taskId,
  onEdited,
}: {
  taskId: string
  onEdited: () => void
}) {
  const { task, isLoading, error } = useTask(taskId)
  const { save } = useUpdateTask()

  async function handleSave() {
    if (!task) return
    await save({ ...task, title: uuidv4() })
    onEdited()
  }

  return (
    <Modal>
      <>
        {isLoading ? <>Loading...</> : null}
        {error ? <>{error}</> : null}
        {!isLoading && !error ? (
          <>
            edit {taskId}
            <button onClick={handleSave}>Save</button>
          </>
        ) : null}
      </>
    </Modal>
  )
}
