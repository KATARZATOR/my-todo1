import React, { useState } from 'react'
import PropTypes from 'prop-types'

function NewTaskForm({ onItemAdded }) {
  const [label, setLabel] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  const onLabelChange = (e) => {
    setLabel(e.target.value)
  }

  const onMinutesChange = (e) => {
    setMinutes(e.target.value)
  }

  const onSecondsChange = (e) => {
    setSeconds(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (label.trim()) {
      onItemAdded(label, minutes, seconds)
      setLabel('')
      setMinutes('')
      setSeconds('')
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <input
          className="new-todo"
          placeholder="Task"
          type="text"
          autoComplete="off"
          value={label}
          onChange={onLabelChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSubmit(e)
          }}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          type="number"
          min="0"
          value={minutes}
          onChange={onMinutesChange}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          type="number"
          min="0"
          max="59"
          value={seconds}
          onChange={onSecondsChange}
        />
      </form>
    </header>
  )
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
}

export default NewTaskForm
