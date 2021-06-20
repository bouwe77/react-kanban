import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { ColumnType, TaskType } from '../types'

const tasksUrl = 'http://localhost:5442/tasks/'

export function useTasks(triggerRefetchToggle: boolean) {
  const [tasks, setTasks] = useState<Array<TaskType>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    async function fetchTasks() {
      setError(undefined)
      setIsLoading(true)
      try {
        const tasks = await axios.get(tasksUrl).then((res) => res.data)
        setTasks(tasks)
        setIsLoading(false)
      } catch (error) {
        setError(error.stack)
      } finally {
        setIsLoading(false)
      }
    }
    fetchTasks()
  }, [triggerRefetchToggle])

  return { tasks, isLoading, error }
}

export function useTask(taskId: string) {
  const [task, setTask] = useState<TaskType>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    async function fetchTask() {
      setError(undefined)
      setIsLoading(true)
      try {
        const task = await axios.get(tasksUrl + taskId).then((res) => res.data)
        setTask(task)
      } catch (error) {
        setError(error.stack)
      } finally {
        setIsLoading(false)
      }
    }
    fetchTask()
  }, [taskId])

  return { task, isLoading, error }
}

export function useCreateTask() {
  const [createdTask, setCreatedTask] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const save = useCallback(async (task: TaskType) => {
    setError(undefined)
    setIsLoading(true)
    try {
      const createdTask = await axios
        .post(tasksUrl, task)
        .then((res) => res.data)
      setCreatedTask(createdTask)
    } catch (error) {
      setError(error.stack)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { save, isLoading, error, createdTask }
}

export function useUpdateTask() {
  const [updatedTask, setUpdatedTask] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const save = useCallback(async (task: TaskType) => {
    setError(undefined)
    setIsLoading(true)
    try {
      const updatedTask = await axios
        .put(tasksUrl + task.id, task)
        .then((res) => res.data)
      setUpdatedTask(updatedTask)
    } catch (error) {
      setError(error.stack)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { save, isLoading, error, updatedTask }
}

export function useDeleteTask() {
  const [deletedTask, setDeletedTask] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const save = useCallback(async (taskId: string) => {
    setError(undefined)
    setIsLoading(true)
    try {
      const deletedTask = await axios
        .delete(tasksUrl + taskId)
        .then((res) => res.data)
      setDeletedTask(deletedTask)
    } catch (error) {
      setError(error.stack)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { save, isLoading, error, deletedTask }
}

export function useMoveTask() {
  return function (taskId: string, column: ColumnType) {
    const task = { column }
    try {
      axios.patch(tasksUrl + taskId, task).then((res) => res.data)
    } catch (error) {
      console.error(error)
    }
  }
}
