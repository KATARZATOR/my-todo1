/*eslint-disable*/
import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import NewTaskForm from './components/NewTaskForm/NewTaskForm';
import Footer from './components/Footer/Footer';
import TaskList from './components/TaskList/TaskList';

export default class App extends Component {
  static filterTasks(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.completed);
      case 'completed':
        return items.filter((item) => item.completed);
      default:
        return items;
    }
  }

  constructor() {
    super();
    this.state = {
      todoData: [],
      filter: 'all',
      editingTaskId: null,
    };
    this.maxId = 100;
  }

  componentDidMount() {
    this.timerID = setInterval(this.updateTimers, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  onToggleLeft = () => {
    const { todoData } = this.state;
    const activeItemsLeft = todoData.filter((item) => !item.completed).length;
    return activeItemsLeft;
  };

  setFilter = (filter) => {
    this.setState({ filter });
  };

  clearCompleted = () => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((item) => !item.completed),
    }));
  };

  toggleTaskCompletion = (id) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      ),
    }));
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((item) => item.id !== id),
    }));
  };

  addItem = (text, minutes = '0', seconds = '0') => {
    const newItem = this.createTodoItem(text, minutes, seconds);

    this.setState(({ todoData }) => ({
      todoData: [...todoData, newItem],
    }));
  };

  startEditing = (id) => {
    this.setState({ editingTaskId: id });
  };

  finishEditing = (id, newLabel) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((item) =>
        item.id === id ? { ...item, label: newLabel } : item
      ),
      editingTaskId: null,
    }));
  };

  createTodoItem(label, minutes = '0', seconds = '0') {
    this.maxId += 1;
    const timeInSeconds =
      parseInt(minutes || '0', 10) * 60 + parseInt(seconds || '0', 10);
    return {
      label,
      id: this.maxId,
      completed: false,
      createdAt: new Date(),
      timerRunning: false,
      remainingTime: timeInSeconds,
    };
  }

  startTimer = (id) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((item) => {
        if (item.id === id && !item.timerRunning && item.remainingTime > 0) {
          return {
            ...item,
            timerRunning: true,
          };
        }
        return item;
      }),
    }));
  };

  stopTimer = (id) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((item) => {
        if (item.id === id && item.timerRunning) {
          return {
            ...item,
            timerRunning: false,
          };
        }
        return item;
      }),
    }));
  };

  updateTimers = () => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((item) => {
        if (item.timerRunning && item.remainingTime > 0) {
          return {
            ...item,
            remainingTime: item.remainingTime - 1,
          };
        } else if (item.timerRunning && item.remainingTime <= 0) {
          return {
            ...item,
            timerRunning: false,
            remainingTime: 0,
          };
        }
        return item;
      }),
    }));
  };

  render() {
    const { todoData, filter, editingTaskId } = this.state;
    const itemsLeft = this.onToggleLeft();
    const visibleItems = App.filterTasks(todoData, filter);

    return (
      <section className="todoapp">
        <NewTaskForm onItemAdded={this.addItem} />
        <section className="main">
          <TaskList
            todos={visibleItems}
            onDeleted={this.deleteItem}
            onToggleTaskCompletion={this.toggleTaskCompletion}
            onStartEditing={this.startEditing}
            onFinishEditing={this.finishEditing}
            editingTaskId={editingTaskId}
            onStartTimer={this.startTimer}
            onStopTimer={this.stopTimer}
          />
          <Footer
            itemsLeft={itemsLeft}
            filter={filter}
            onFilterChange={this.setFilter}
            onClearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    );
  }
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);