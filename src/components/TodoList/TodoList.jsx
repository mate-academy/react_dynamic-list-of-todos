import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

export class TodoList extends React.Component {
  state = {
    title: '',
    filter: '',
    selectedTodoId: '',
  }

  handleChange = (event, name) => {
    const { filterUser } = this.props;

    this.setState({ [name]: event.target.value });
    filterUser(event.target.value, name);
  }

  handleSelect = (event) => {
    const { filterTodosByStatus } = this.props;
    const { value } = event.target;

    this.setState({ filter: value });
    filterTodosByStatus(value);
  }

  handleSelectUser = (todoId, userId) => {
    this.props.selectUser(userId);
    this.setState({ selectedTodoId: todoId });
  }

  render() {
    const { todos, shuffle } = this.props;
    const { title, filter, selectedTodoId } = this.state;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="TodoList__form">
          <input
            type="text"
            name="title"
            value={title}
            placeholder="choose Todo Title"
            onChange={event => this.handleChange(event, 'title')}
            className="TodoList__input input"
          />
          <select
            value={filter}
            name="status"
            onChange={this.handleSelect}
            className="TodoList__select select"
          >
            <option value="" disabled>filter by status</option>
            <option value="all">all</option>
            <option value="active">active</option>
            <option value="completed">completed</option>
          </select>
          <button
            type="button"
            onClick={shuffle}
            className="button button--randomize"
          >
            randomize
          </button>
        </div>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todos.map(todo => (
              <li
                className={ClassNames('TodoList__item', {
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                })}
                key={todo.id}
              >
                <label>
                  <input type="checkbox" />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={ClassNames(
                    'TodoList__button', 'button', {
                      'TodoList__button--selected': todo.id === selectedTodoId,
                    },
                  )}
                  type="button"
                  onClick={() => this.handleSelectUser(todo.id, todo.userId)}
                >
                  {`User ${todo.userId}`}
                </button>
              </li>
            ))}
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
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectUser: PropTypes.func.isRequired,
  filterUser: PropTypes.func.isRequired,
  filterTodosByStatus: PropTypes.func.isRequired,
  shuffle: PropTypes.func.isRequired,
};
