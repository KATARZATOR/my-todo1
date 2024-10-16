import React, { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

function Task({
  id,
  label,
  completed,
  onToggle,
  onDeleted,
  onStartEditing,
  onFinishEditing,
  isEditing,
  createdAt,
}) {
  const [newLabel, setNewLabel] = useState(label)

  const handleSubmit = (e) => {
    e.preventDefault()
    onFinishEditing(id, newLabel)
  }

  if (isEditing) {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input
            className="edit"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            onBlur={() => onFinishEditing(id, newLabel)}
            autoFocus // eslint-disable-line jsx-a11y/no-autofocus
          />
        </form>
      </div>
    )
  }

  return (
    <div className="view">
      <input
        id={`task-${id}`}
        className="toggle"
        type="checkbox"
        checked={completed}
        onChange={onToggle}
      />
      <label htmlFor={`task-${id}`}>
        <span className="description">{label}</span>
        <span className="created">
          created{' '}
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </span>
      </label>
      <button
        type="button"
        className="icon icon-edit"
        aria-label="Edit task"
        onClick={onStartEditing}
      />
      <button
        type="button"
        className="icon icon-destroy"
        onClick={onDeleted}
        aria-label="Delete task"
      />
    </div>
  )
}

Task.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  completed: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onStartEditing: PropTypes.func.isRequired,
  onFinishEditing: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  createdAt: PropTypes.instanceOf(Date),
}

Task.defaultProps = {
  completed: false,
  createdAt: new Date(),
}

export default Task
