import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './TodoList.scss';

export class TodoList extends React.PureComponent {
  state = {
    inputFilter: '',
    selectFilter: 'all',
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  render() {
    const { todos, selectedUserId, onUserSelected } = this.props;
    const { inputFilter, selectFilter } = this.state;

    const todosFilteredBySelect = todos.filter((todo) => {
      switch (selectFilter) {
        case 'all':
          return todo;

        case 'active':
          return !todo.completed;

        default: return todo.completed;
      }
    });

    const todosFilteredByInput = todosFilteredBySelect.filter(
      todo => todo.title && todo.title.includes(inputFilter),
    );

    return (
      <div className="TodoList">
        <label>
          Filter by title:&nbsp;
          <input
            type="text"
            name="inputFilter"
            value={inputFilter}
            onChange={this.handleChange}
          />
        </label>
        <select
          name="selectFilter"
          id="selectFilter"
          onChange={this.handleChange}
        >
          <option value="all">Show all</option>
          <option value="active">Show active</option>
          <option value="completed">Show completed</option>
        </select>

        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todosFilteredByInput.map(todo => (
              <li
                key={todo.id}
                className={classNames({
                  TodoList__item: true,
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                })}
              >
                <label>
                  <input type="checkbox" readOnly />
                  <p>{todo.title}</p>
                </label>

                <button
                  type="button"
                  className={classNames({
                    button: true,
                    'TodoList__user-button': selectedUserId !== todo.userId,
                    'TodoList__user-button--selected':
                      selectedUserId === todo.userId,
                  })}
                  onClick={() => onUserSelected(todo.userId)}
                >
                  User&nbsp;
                  {todo.userId}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.defaultProps = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      userId: null,
      completed: null,
      title: null,
    }),
  ),
};

TodoList.propTypes = {
  selectedUserId: PropTypes.number.isRequired,
  onUserSelected: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number,
      completed: PropTypes.bool,
      title: PropTypes.string,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
    }),
  ),
};
