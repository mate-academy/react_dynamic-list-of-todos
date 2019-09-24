import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css';

class TodoList extends Component {
  state = {
    todos: this.props.todos,
  }

  sortByName = () => {
    this.setState(prevState => ({
      todos: [...prevState.todos].sort((todo1, todo2) => {
        if (todo1.user.name < todo2.user.name) {
          return -1;
        }
        if (todo1.user.name > todo2.user.name) {
          return 1;
        }

        return 0;
      }),
    }));
  };

  sortByTitle = () => {
    this.setState(prevState => ({
      todos: [...prevState.todos].sort((todo1, todo2) => {
        if (todo1.title < todo2.title) {
          return -1;
        }
        if (todo1.title > todo2.title) {
          return 1;
        }

        return 0;
      }),
    }));
  };

  sortByCompleted = () => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos.filter(todo => !todo.completed),
        ...prevState.todos.filter(todo => todo.completed),
      ],
    }));
  };

  resetTodos = () => {
    this.setState({ todos: [...this.props.todos] });
  }

  render() {
    const { todos } = this.state;

    return (
      <div className="todos-list">
        <h2>Sort TodoList</h2>
        <button type="submit" onClick={this.sortByName}>by Name</button>
        <button type="submit" onClick={this.sortByTitle}>by Title</button>
        <button
          type="submit"
          onClick={this.sortByCompleted}
        >
          by completed
        </button>
        <button type="submit" onClick={this.resetTodos}>Reset</button>
        <div className="todo-items">
          {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      userId: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
    })
  ).isRequired,
};

export default TodoList;
