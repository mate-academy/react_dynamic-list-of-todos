import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../TodoItem/TodoItem';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSorted: false,
      sortType: '',
    };
    this.todos = this.props.todos;
    this.sorting = this.sorting.bind(this);
  }

  sorting(typeofSort) {
    this.setState({
      isSorted: true,
      sortType: typeofSort,
    });
  }

  render() {
    const todoList = [...this.todos];
    if (this.state.isSorted) {
      switch (this.state.sortType) {
        case 'Title':
          todoList.sort((a, b) => (a.title > b.title ? 1 : -1));
          break;
        case 'Username':
          todoList.sort((a, b) => (a.user.name > b.user.name ? 1 : -1));
          break;
        case 'Status':
          todoList.sort((a, b) => a.completed - b.completed);
          break;
        default:
          break;
      }
    }
    return (
      <table className="todo-list">
        <thead className="todo-list-head">
          <tr>
            <td>
              <button type="button" onClick={() => this.sorting('Title')}>
                Title
              </button>
            </td>
            <td>
              <button type="button" onClick={() => this.sorting('Username')}>
                Username
              </button>
            </td>
            <td>
              <button type="button" onClick={() => this.sorting('Status')}>
                Status
              </button>
            </td>
          </tr>
        </thead>
        <tbody className="todo-list-body">
          {todoList.map(todo => <TodoItem todo={todo} key={todo.id} />)}
        </tbody>
      </table>
    );
  }
}

TodoList.defaultProps = {
  todos: [],
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })),
};

export default TodoList;
