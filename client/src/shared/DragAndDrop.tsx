import { ReactNode } from 'react'

interface Props extends React.ComponentPropsWithoutRef<'div'> {
  children: ReactNode
  onDropCallback: (id: string) => void
}

export default function DragAndDrop(props: Props) {
  const { children, onDropCallback, ...rest } = props

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    if (!event) return
    event.preventDefault()
  }

  function handleDragEnter(event: React.DragEvent<HTMLDivElement>) {
    if (!event) return
    event.preventDefault()
  }

  function handleDragStart(event: React.DragEvent<HTMLDivElement>) {
    if (!event) return
    const elementId = (event.target as HTMLDivElement).id
    event.dataTransfer.setData('elementId', elementId)
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    if (!event) return
    event.preventDefault()

    const elementId = event.dataTransfer.getData('elementId')
    onDropCallback(elementId)
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      {...rest}
    >
      {children}
    </div>
  )
}
