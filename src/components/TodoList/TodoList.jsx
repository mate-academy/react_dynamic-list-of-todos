import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Todo } from '../Todo';

import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    title: '',
    status: 'All',
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { todos } = this.props;
    const { title, status } = this.state;
    let prepearedTodoList;

    switch (status) {
      case 'All':
        prepearedTodoList = todos;
        break;
      case 'Completed':
        prepearedTodoList = todos.filter(todo => todo.completed === true);
        break;
      case 'Active':
        prepearedTodoList = todos.filter(todo => todo.completed === false);
        break;
      default:
        break;
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <input
          name="title"
          placeholder="input todo title"
          value={title}
          onChange={this.handleChange}
        />
        <select
          value={status}
          name="status"
          onChange={this.handleChange}
        >
          <option>All</option>
          <option>Completed</option>
          <option>Active</option>
        </select>
        <button
          className="button"
          type="button"
          onClick={() => this.props.shuffleTodos(todos)}
        >
          Shuffle
        </button>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {prepearedTodoList
              .filter(todo => todo.title
                && (todo.title).includes(title))
              .map(todo => (
                <li
                  key={todo.id}
                  className={classNames('TodoList__item', {
                    'TodoList__item--checked': todo.completed,
                    'TodoList__item--unchecked': !todo.completed,
                  })
                }
                >
                  <Todo
                    todo={todo}
                    selectUser={this.props.selectUser}
                    userId={this.props.userId}
                  />
                </li>
              ))}

          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  selectUser: PropTypes.func.isRequired,
  shuffleTodos: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};
