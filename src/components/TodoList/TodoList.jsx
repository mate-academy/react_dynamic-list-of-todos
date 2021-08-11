import React from 'react';
import classNames from 'classnames';
import './TodoList.scss';
import PropTypes from 'prop-types';

export class TodoList extends React.Component {
  state = {
    filterText: '',
    selectParameter: 'all',
  }

  filterTodosByText = (event) => {
    this.setState({
      filterText: event.target.value,
    });
  };

  filterTodosByParameters = (event) => {
    this.setState({
      selectParameter: event.target.value,
    });
  };

  render() {
    const { todos, selectedUserId, userBtnOnClick } = this.props;
    const { filterText, selectParameter } = this.state;

    const filteredTodos = todos
      .filter(
        todo => todo.title
          && todo.title.includes(filterText),
      )
      .filter(
        (todo) => {
          switch (selectParameter) {
            case 'all':
              return true;
            case 'active':
              return !todo.completed;
            case 'completed':
              return todo.completed;
            default:
              return true;
          }
        },
      );

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="TodoList__list-container">
          <span> Filter: </span>
          <input
            className="TodoList__filter"
            placeholder="enter todo"
            onChange={this.filterTodosByText}
          />
          <select
            name="select"
            onChange={this.filterTodosByParameters}
          >
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

          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item', {
                    'TodoList__item--checked': todo.completed,
                    'TodoList__item--unchecked': !todo.completed,
                  },
                )
                }
              >
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    readOnly
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  type="button"
                  className={classNames(
                    'TodoList__user-button',
                    'button',
                    { 'TodoList__user-button--selected':
                    todo.userId === selectedUserId },
                  )}
                  onClick={() => userBtnOnClick(todo.userId)}
                >
                  User&nbsp;#
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

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
    userId: PropTypes.number,
  })),
  userBtnOnClick: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
};

TodoList.defaultProps = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: '',
    completed: false,
    userId: 0,
  })),
};
