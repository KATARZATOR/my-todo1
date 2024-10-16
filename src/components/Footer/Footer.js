import React from 'react'
import PropTypes from 'prop-types'

function Footer({ itemsLeft, filter, onFilterChange, onClearCompleted }) {
  return (
    <footer className="footer">
      <span className="todo-count">{itemsLeft} items left</span>
      <ul className="filters">
        <li>
          <button
            type="button"
            className={filter === 'all' ? 'selected' : ''}
            onClick={() => onFilterChange('all')}
          >
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            className={filter === 'active' ? 'selected' : ''}
            onClick={() => onFilterChange('active')}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            className={filter === 'completed' ? 'selected' : ''}
            onClick={() => onFilterChange('completed')}
          >
            Completed
          </button>
        </li>
      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={onClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  itemsLeft: 0,
  filter: 'all',
  onFilterChange: () => {},
  onClearCompleted: () => {},
}

Footer.propTypes = {
  itemsLeft: PropTypes.number,
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
  onClearCompleted: PropTypes.func,
}

export default Footer
