import React from 'react';
import PropTypes from 'prop-types';

import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    title: '',
    filter: '',
    selectedId: '',
  }

  handleChange = ({ target }, name) => {
    const { filterUser } = this.props;

    this.setState({ [name]: target.value });
    filterUser(target.value, name);
  }

  handleSelect = ({ target }) => {
    const { filterUserByCompleted } = this.props;
    const { value } = target;

    this.setState({ filter: value });
    filterUserByCompleted(value);
  }

  handleSelectUser = (id, userId) => {
    const { selectUser } = this.props;

    selectUser(userId);
    this.setState({ selectedId: id });
  }

  render() {
    const { todos } = this.props;
    const { title, filter, selectedId } = this.state;

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
            name="completed"
            onChange={this.handleSelect}
            className="TodoList__select select"
          >
            <option value="">filter by status</option>
            <option value="all">all</option>
            <option value="active">active</option>
            <option value="completed">completed</option>
          </select>
        </div>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todos.map(todo => (
              <li
                key={todo.id}
                className={
                  `TodoList__item
                ${todo.completed
                ? 'TodoList__item--checked'
                : 'TodoList__item--unchecked'}`
                }
              >
                <label>
                  <input type="checkbox" />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={
                    `button ${selectedId === todo.id
                      ? 'TodoList__user-button--selected'
                      : 'TodoList__user-button'}`
                  }
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
      title: PropTypes.string.isRequired,
      userId: PropTypes.number.isRequired,
      completed: PropTypes.bool,
    }).isRequired,
  ).isRequired,
  filterUser: PropTypes.func.isRequired,
  filterUserByCompleted: PropTypes.func.isRequired,
  selectUser: PropTypes.func.isRequired,
};
