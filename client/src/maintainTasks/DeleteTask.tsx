import Modal from '../shared/Modal'
import { useTask, useDeleteTask } from '../hooks/tasks'

export default function DeleteTask({
  taskId,
  onDeleted,
}: {
  taskId: string
  onDeleted: () => void
}) {
  const { task, isLoading, error } = useTask(taskId)
  const { save } = useDeleteTask()

  async function handleSave() {
    if (!task) return
    await save(taskId)
    onDeleted()
  }

  return (
    <Modal>
      <>
        {isLoading ? <>Loading...</> : null}
        {error ? <>{error}</> : null}
        {!isLoading && !error ? (
          <>
            delete {taskId}
            <button onClick={handleSave}>Save</button>
          </>
        ) : null}
      </>
    </Modal>
  )
}
