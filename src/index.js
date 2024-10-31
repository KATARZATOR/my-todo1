import React, { useState, useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import NewTaskForm from './components/NewTaskForm/NewTaskForm'
import Footer from './components/Footer/Footer'
import TaskList from './components/TaskList/TaskList'

function filterTasks(items, filter) {
  switch (filter) {
    case 'all':
      return items
    case 'active':
      return items.filter((item) => !item.completed)
    case 'completed':
      return items.filter((item) => item.completed)
    default:
      return items
  }
}

function App() {
  const [todoData, setTodoData] = useState([])
  const [filter, setFilterState] = useState('all')
  const [editingTaskId, setEditingTaskId] = useState(null)
  const maxId = useRef(100)

  useEffect(() => {
    const timerID = setInterval(updateTimers, 1000) // eslint-disable-line
    return () => clearInterval(timerID)
  }, [])

  const onToggleLeft = () => todoData.filter((item) => !item.completed).length

  const setFilter = (newFilter) => {
    setFilterState(newFilter)
  }

  const clearCompleted = () => {
    setTodoData((prevTodoData) =>
      prevTodoData.filter((item) => !item.completed)
    )
  }

  const toggleTaskCompletion = (id) => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, completed: !item.completed }
          if (updatedItem.completed) {
            updatedItem.timerRunning = false
            updatedItem.remainingTime = 0
          }
          return updatedItem
        }
        return item
      })
    )
  }

  const deleteItem = (id) => {
    setTodoData((prevTodoData) => prevTodoData.filter((item) => item.id !== id))
  }

  const addItem = (text, minutes = '0', seconds = '0') => {
    const timeInSeconds =
      parseInt(minutes || '0', 10) * 60 + parseInt(seconds || '0', 10)
    if (!text.trim() || timeInSeconds <= 0) {
      return
    }
    const newItem = createTodoItem(text, minutes, seconds) // eslint-disable-line
    setTodoData((prevTodoData) => [...prevTodoData, newItem])
  }

  const startEditing = (id) => {
    setEditingTaskId(id)
  }

  const finishEditing = (id, newLabel) => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((item) =>
        item.id === id ? { ...item, label: newLabel } : item
      )
    )
    setEditingTaskId(null)
  }

  const createTodoItem = (label, minutes = '0', seconds = '0') => {
    maxId.current += 1
    const timeInSeconds =
      parseInt(minutes || '0', 10) * 60 + parseInt(seconds || '0', 10)
    return {
      label,
      id: maxId.current,
      completed: false,
      createdAt: new Date(),
      timerRunning: false,
      remainingTime: timeInSeconds,
    }
  }

  const startTimer = (id) => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((item) => {
        if (item.id === id && !item.timerRunning && item.remainingTime > 0) {
          return { ...item, timerRunning: true }
        }
        return item
      })
    )
  }

  const stopTimer = (id) => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((item) => {
        if (item.id === id && item.timerRunning) {
          return { ...item, timerRunning: false }
        }
        return item
      })
    )
  }

  const updateTimers = () => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((item) => {
        if (item.timerRunning && item.remainingTime > 0) {
          return { ...item, remainingTime: item.remainingTime - 1 }
        }
        if (item.timerRunning && item.remainingTime <= 0) {
          return { ...item, timerRunning: false, remainingTime: 0 }
        }
        return item
      })
    )
  }

  const itemsLeft = onToggleLeft()
  const visibleItems = filterTasks(todoData, filter)

  return (
    <section className="todoapp">
      <NewTaskForm onItemAdded={addItem} />
      <section className="main">
        <TaskList
          todos={visibleItems}
          onDeleted={deleteItem}
          onToggleTaskCompletion={toggleTaskCompletion}
          onStartEditing={startEditing}
          onFinishEditing={finishEditing}
          editingTaskId={editingTaskId}
          onStartTimer={startTimer}
          onStopTimer={stopTimer}
        />
        <Footer
          itemsLeft={itemsLeft}
          filter={filter}
          onFilterChange={setFilter}
          onClearCompleted={clearCompleted}
        />
      </section>
    </section>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)

export default App
