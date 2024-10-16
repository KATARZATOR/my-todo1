import React, { useState } from 'react'
import PropTypes from 'prop-types'

function NewTaskForm({ onItemAdded }) {
  const [label, setLabel] = useState('')

  const onLabelChange = (e) => {
    setLabel(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (label.trim()) {
      onItemAdded(label)
      setLabel('')
    }
  }

  return (
    <header className="header">
      <h1>Todos</h1>
      <form onSubmit={onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          type="text"
          autoComplete="off"
          value={label}
          onChange={onLabelChange}
        />
      </form>
    </header>
  )
}

NewTaskForm.defaultProps = {
  onItemAdded: () => {},
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func,
}

export default NewTaskForm
