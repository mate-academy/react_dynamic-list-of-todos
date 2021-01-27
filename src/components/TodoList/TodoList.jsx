import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    title: '',
    filter: 'all',
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { todos, getUserId, changeComplate } = this.props;
    const { title, filter } = this.state;

    let filteredTodos = [];

    if (title === '') {
      filteredTodos = [...todos];
    } else {
      filteredTodos = todos.filter(todo => (todo.title !== null))
        .filter(todo => (todo.title.includes(title)));
    }

    if (filter === 'active') {
      filteredTodos = filteredTodos.filter(todo => (!todo.completed));
    }

    if (filter === 'completed') {
      filteredTodos = filteredTodos.filter(todo => (todo.completed));
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <label>
          {' '}
          Filter:
          <input
            name="title"
            type="text"
            placeholder="tape a todo"
            value={title}
            onChange={this.handleChange}
          />
        </label>

        <label>
          <select
            name="filter"
            value={filter}
            onChange={this.handleChange}
          >
            <option value="all">all</option>
            <option value="active">active</option>
            <option value="completed">completed</option>
          </select>
        </label>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames('TodoList__item', {
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                })}
              >
                <label>
                  <input
                    type="checkbox"
                    name="todo"
                    checked={todo.completed}
                    readOnly
                    onChange={() => {
                      changeComplate(todo.id);
                    }}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames(
                    'TodoList__user-button', 'button',
                    { 'TodoList__user-button--selected': !todo.completed },
                  )}
                  type="button"
                  onClick={() => {
                    getUserId(todo.userId);
                  }}
                >
                  User&nbsp;
                  {todo.userId}
                </button>
              </li>
            ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      completed: PropTypes.bool,
    }).isRequired,
  ).isRequired,

  getUserId: PropTypes.func.isRequired,
  changeComplate: PropTypes.func.isRequired,
};
