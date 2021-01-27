import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    title: '',
    filter: 'all',
  }

  render() {
    const { todos, getUserId, changeComplate } = this.props;

    let filteredTodos = [];

    if (this.state.title === '') {
      filteredTodos = [...todos];
    } else {
      filteredTodos = todos.filter(todo => (todo.title !== null))
        .filter(todo => (todo.title.includes(this.state.title)));
    }

    if (this.state.filter === 'active') {
      filteredTodos = filteredTodos.filter(todo => (!todo.completed));
    }

    if (this.state.filter === 'completed') {
      filteredTodos = filteredTodos.filter(todo => (todo.completed));
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <label>
          <input
            name="title"
            type="text"
            placeholder="tape a todo"
            value={this.state.title}
            onChange={(event) => {
              this.setState({
                title: event.target.value,
              });
            }}
          />
        </label>

        <label>
          <select
            name="filter"
            value={this.state.filter}
            onChange={(event) => {
              this.setState({
                filter: event.target.value,
              });
            }}
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
                className={todo.completed
                  ? 'TodoList__item TodoList__item--checked'
                  : 'TodoList__item TodoList__item--unchecked'}
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
                  className="TodoList__user-button button"
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
