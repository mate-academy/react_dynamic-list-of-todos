import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export class TodoList extends React.Component {
  state = {
    status: '',
    query: '',
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { todos, onSelect, selectedUserId } = this.props;

    const includesTodo = todos.filter(
      todo => todo.title && todo.title.includes(this.state.query),
    );

    const completedTodos = includesTodo.filter(
      ({ completed }) => {
        switch (this.state.status) {
          case 'active':
            return !completed;
          case 'completed':
            return completed;
          default:
            return true;
        }
      },
    );

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <label>
          Search by title names
          <input
            name="query"
            type="text"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </label>
        <select
          name="status"
          value={this.state.status}
          onChange={this.handleChange}
        >
          <option value="">
            Select todos
          </option>
          <option value="all">
            All
          </option>
          <option value="active">
            Active
          </option>
          <option value="completed">
            Completed
          </option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {completedTodos.map(({ id, title, userId, completed }) => (
              <li
                key={id}
                className={classNames('TodoList__item', {
                  'TodoList__item--checked': completed,
                  'TodoList__item--unchecked': !completed,
                })}
              >
                <label>
                  <input type="checkbox" readOnly />
                  <p>{title}</p>
                </label>

                <button
                  className={classNames('TodoList__user-button', 'button', {
                    'TodoList__user-button--selected':
                      userId === selectedUserId,
                  })}
                  type="button"
                  onClick={() => onSelect(userId)}
                >
                  User&nbsp;
                  {userId}
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
  todos: PropTypes.arrayOf({
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
};
