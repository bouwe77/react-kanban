import { useState } from 'react'
import Column from './Column'
import Task from './Task'
import EditTask from '../maintainTasks/EditTask'
import CreateTask from '../maintainTasks/CreateTask'
import DeleteTask from '../maintainTasks/DeleteTask'
import { useMoveTask, useTasks } from '../hooks/tasks'
import { ColumnType } from '../types'

type MaintainTask = CreateTaskInfo | EditTaskInfo | DeleteTaskInfo

type CreateTaskInfo = {
  kind: 'create'
  column: ColumnType
}

type EditTaskInfo = {
  kind: 'update'
  taskId: string
}

type DeleteTaskInfo = {
  kind: 'delete'
  taskId: string
}

export default function Kanban() {
  const [triggerRefetchToggle, setTriggerRefetchToggle] = useState(true)
  const { tasks, isLoading, error } = useTasks(triggerRefetchToggle)
  const moveTask = useMoveTask()
  const [maintainTask, setMaintainTask] = useState<MaintainTask | null>(null)

  function handleMoveTask(taskId: string, column: ColumnType) {
    moveTask(taskId, column)
    setTriggerRefetchToggle(!triggerRefetchToggle)
  }

  function getCardsForColumn(column: ColumnType): Array<JSX.Element> {
    return tasks
      .filter((t) => t.column === column)
      .map((t) => (
        <Task
          key={t.id}
          updateTask={
            <button
              onClick={() => setMaintainTask({ kind: 'update', taskId: t.id })}
            >
              update
            </button>
          }
          deleteTask={
            <button
              onClick={() => setMaintainTask({ kind: 'delete', taskId: t.id })}
            >
              delete
            </button>
          }
          id={t.id}
        >
          {t.title}
        </Task>
      ))
  }

  function handleOnSaved() {
    setMaintainTask(null)
    setTriggerRefetchToggle(!triggerRefetchToggle)
  }

  if (isLoading) return <>Loading...</>

  if (error) return <>{error}</>

  return (
    <div style={{ display: 'flex' }}>
      {maintainTask && maintainTask.kind === 'update' ? (
        <EditTask taskId={maintainTask.taskId} onEdited={handleOnSaved} />
      ) : null}

      {maintainTask && maintainTask.kind === 'create' ? (
        <CreateTask column={maintainTask.column} onCreated={handleOnSaved} />
      ) : null}

      {maintainTask && maintainTask.kind === 'delete' ? (
        <DeleteTask taskId={maintainTask.taskId} onDeleted={handleOnSaved} />
      ) : null}

      <Column
        title="TO DO"
        create={
          <button
            onClick={() =>
              setMaintainTask({ kind: 'create', column: ColumnType.TODO })
            }
            aria-label={`Create task in column TO DO`}
          >
            create
          </button>
        }
        handleMoveTask={(taskId: string) =>
          handleMoveTask(taskId, ColumnType.TODO)
        }
      >
        {getCardsForColumn(ColumnType.TODO)}
      </Column>

      <Column
        title="DOING"
        create={
          <button
            onClick={() =>
              setMaintainTask({ kind: 'create', column: ColumnType.DOING })
            }
          >
            create
          </button>
        }
        handleMoveTask={(taskId: string) =>
          handleMoveTask(taskId, ColumnType.DOING)
        }
      >
        {getCardsForColumn(ColumnType.DOING)}
      </Column>
      <Column
        title="DONE"
        create={
          <button
            onClick={() =>
              setMaintainTask({ kind: 'create', column: ColumnType.DONE })
            }
          >
            create
          </button>
        }
        handleMoveTask={(taskId: string) =>
          handleMoveTask(taskId, ColumnType.DONE)
        }
      >
        {getCardsForColumn(ColumnType.DONE)}
      </Column>
    </div>
  )
}
