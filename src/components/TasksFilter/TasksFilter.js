import React from 'react'

function TasksFilters() {
  return (
    <ul className="filters">
      <li>
        <button type="button" className="selected">
          All
        </button>
      </li>
      <li>
        <button type="button">Active</button>
      </li>
      <li>
        <button type="button">Completed</button>
      </li>
    </ul>
  )
}

export default TasksFilters
