import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export class TodoList extends React.Component {
  state = {
    query: '',
    status: 'all',
  };

  handleChange = (event, field) => {
    this.setState({
      [field]: event.target.value,
    });
  };

  render() {
    const { todos, onSelect, selectedUserId } = this.props;

    const filteredTodos = todos
      .filter(
        ({ title }) => title.toLowerCase().includes(this.state.query),
      ).filter(
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
          Search by title
          <input
            type="text"
            onChange={event => this.handleChange(event, 'query')}
          />
        </label>
        <select
          onChange={event => this.handleChange(event, 'status')}
        >
          <option value="">
            Select todos
          </option>
          <option
            value="all"
          >
            All
          </option>
          <option
            value="active"
          >
            Active
          </option>
          <option
            value="completed"
          >
            Completed
          </option>
        </select>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(({ id, title, userId, completed }) => (
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
