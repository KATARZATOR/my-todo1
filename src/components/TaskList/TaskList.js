import React from 'react'
import PropTypes from 'prop-types'
import Task from '../Task/Task'

function TaskList({
  todos,
  onDeleted,
  onToggleTaskCompletion,
  onStartEditing,
  onFinishEditing,
  editingTaskId,
  onStartTimer,
  onStopTimer,
}) {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item

    const isEditing = editingTaskId === id

    return (
      <li
        key={id}
        className={`${item.completed ? 'completed' : ''} ${
          isEditing ? 'editing' : ''
        }`}
      >
        <Task
          id={id}
          label={itemProps.label}
          completed={itemProps.completed}
          createdAt={itemProps.createdAt}
          remainingTime={itemProps.remainingTime}
          timerRunning={itemProps.timerRunning}
          onToggle={() => onToggleTaskCompletion(id)}
          onDeleted={() => onDeleted(id)}
          onStartEditing={() => onStartEditing(id)}
          onFinishEditing={onFinishEditing}
          isEditing={isEditing}
          onStartTimer={onStartTimer}
          onStopTimer={onStopTimer}
        />
      </li>
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      createdAt: PropTypes.instanceOf(Date).isRequired,
      remainingTime: PropTypes.number.isRequired,
      timerRunning: PropTypes.bool.isRequired,
    })
  ),
  onDeleted: PropTypes.func.isRequired,
  onToggleTaskCompletion: PropTypes.func.isRequired,
  onStartEditing: PropTypes.func.isRequired,
  onFinishEditing: PropTypes.func.isRequired,
  editingTaskId: PropTypes.number,
  onStartTimer: PropTypes.func.isRequired,
  onStopTimer: PropTypes.func.isRequired,
}

TaskList.defaultProps = {
  todos: [],
  editingTaskId: null,
}

export default TaskList
