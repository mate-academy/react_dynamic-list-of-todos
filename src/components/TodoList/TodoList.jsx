import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './TodoList.scss';

export class TodoList extends React.PureComponent {
  state ={
    inputFilter: '',
    selectFilter: 'all',
  }

  filterHandler = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  render() {
    const { todos, selectUser, selectedUserId } = this.props;
    const { inputFilter, selectFilter } = this.state;
    const filteredBySelect = todos.filter((todo) => {
      switch (selectFilter) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default:
          return todo;
      }
    });
    const filteredTodos = filteredBySelect.filter(todo => todo.title
      && todo.title.toLowerCase().includes(inputFilter.toLowerCase()));

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div>
          <input
            placeholder="Please enter text"
            type="text"
            name="inputFilter"
            value={inputFilter}
            onChange={this.filterHandler}
          />
          <select
            onChange={this.filterHandler}
            name="selectFilter"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

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
                  <input type="checkbox" checked={todo.completed} readOnly />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames('button', {
                    'TodoList__user-button': todo.userId !== selectedUserId,
                    'TodoList__user-button--selected':
                    todo.userId === selectedUserId,
                  })}
                  type="button"
                  onClick={() => selectUser(todo.userId)}
                >
                  {`User #${todo.userId}`}
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
      userId: PropTypes.number,
      id: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
    }),
  ).isRequired,
  selectUser: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
};
