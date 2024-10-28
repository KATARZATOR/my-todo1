import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}

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
  remainingTime,
  timerRunning,
  onStartTimer,
  onStopTimer,
}) {
  if (isEditing) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onFinishEditing(id, e.target.elements[0].value)
        }}
      >
        <input
          type="text"
          className="edit"
          defaultValue={label}
          onBlur={(e) => onFinishEditing(id, e.target.value)}
          autoFocus // eslint-disable-line jsx-a11y/no-autofocus
        />
      </form>
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
        <span className="title">{label}</span>
        <span className="description">
          {timerRunning ? (
            <button
              type="button"
              className="icon icon-pause"
              onClick={() => onStopTimer(id)}
              aria-label="Pause timer"
            />
          ) : (
            <button
              type="button"
              className="icon icon-play"
              onClick={() => onStartTimer(id)}
              aria-label="Start timer"
            />
          )}
          {formatTime(remainingTime)}
        </span>
        <span className="description">
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
  remainingTime: PropTypes.number,
  timerRunning: PropTypes.bool,
  onStartTimer: PropTypes.func.isRequired,
  onStopTimer: PropTypes.func.isRequired,
}

Task.defaultProps = {
  completed: false,
  createdAt: new Date(),
  remainingTime: 0,
  timerRunning: false,
}

export default Task
