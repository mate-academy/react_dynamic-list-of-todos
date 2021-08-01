import React from 'react';
import classNames from 'classnames';
import propTypes from 'prop-types';
import { TodoType } from '../../types';
import './TodoList.scss';

export class TodoList extends React.PureComponent {
  state = {
    titleFilter: '',
    filterBy: 'all',
  }

  changeFilter = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  render() {
    const { todos, selectedUser, selectedUserId } = this.props;
    const { titleFilter, filterBy } = this.state;
    const filteredTodos = todos.filter(
      todo => (todo.title && todo.title.includes(titleFilter))
       && ((String(todo.completed) === filterBy) || filterBy === 'all'),
    );

    return (
      <div className="TodoList">
        <input
          type="text"
          name="titleFilter"
          value={this.state.titleFilter}
          onChange={this.changeFilter}
        />

        <select name="filterBy" onChange={this.changeFilter}>
          <option value="all" selected>
            All
          </option>

          <option value="false">
            Active
          </option>

          <option value="true">
            Completed
          </option>
        </select>

        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
                  `TodoList__item--${todo.completed ? 'checked' : 'unchecked'}`,
                )}
              >
                <label>
                  <input type="checkbox" readOnly />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames(
                    `TodoList__user-button${
                      selectedUserId === todo.userId && '--selected'
                    }`,
                    'button',
                  )}
                  type="button"
                  onClick={() => selectedUser(todo.userId)}
                >
                  User&nbsp;
                  {`#${todo.userId}`}
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
  todos: propTypes.arrayOf(propTypes.shape(TodoType)).isRequired,
  selectedUser: propTypes.func.isRequired,
  selectedUserId: propTypes.number.isRequired,
};
