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
}) {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item

    return (
      <li
        key={id}
        className={`${item.completed ? 'completed' : ''} ${
          editingTaskId === id ? 'editing' : ''
        }`}
      >
        <Task
          id={id}
          label={itemProps.label}
          completed={itemProps.completed}
          createdAt={itemProps.createdAt}
          onToggle={() => onToggleTaskCompletion(id)}
          onDeleted={() => onDeleted(id)}
          onStartEditing={() => onStartEditing(id)}
          onFinishEditing={onFinishEditing}
          isEditing={editingTaskId === id}
        />
      </li>
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

TaskList.defaultProps = {
  todos: [],
  onDeleted: () => {},
  onToggleTaskCompletion: () => {},
  onStartEditing: () => {},
  onFinishEditing: () => {},
  editingTaskId: null,
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      createdAt: PropTypes.instanceOf(Date).isRequired,
    })
  ),
  onDeleted: PropTypes.func,
  onToggleTaskCompletion: PropTypes.func,
  onStartEditing: PropTypes.func,
  onFinishEditing: PropTypes.func,
  editingTaskId: PropTypes.number,
}

export default TaskList
