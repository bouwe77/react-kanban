export enum ColumnType {
  TODO,
  DOING,
  DONE,
}

export type TaskType = {
  id: string
  title: string
  column: ColumnType
}
