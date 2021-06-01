import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import cn from 'classnames';

export class TodoList extends React.Component {
  state = {
    todoId: 0,
    filterStatus: 'all',
    filterTitle: '',
  };

  selectUser = (todoId, userId) => {
    this.setState({ todoId });
    this.props.onSelectUser(userId);
  }

  setFilter = (event) => {
    this.setState({ filterStatus: event.target.value });
  }

  onInputHandler = (event) => {
    this.setState({ filterTitle: event.target.value });
  }

  filterByStatus = (todo) => {
    const { filterStatus } = this.state;

    switch (filterStatus) {
      case 'completed': return todo.completed;
      case 'active': return !todo.completed;
      default: return true;
    }
  }

  filterByTitle = (todo) => {
    const { filterTitle } = this.state;

    if (todo.title === null) {
      return;
    }

    // eslint-disable-next-line consistent-return
    return todo.title.toLowerCase().includes(filterTitle.toLowerCase());
  }

  render() {
    const { todos } = this.props;
    const { todoId } = this.state;

    const filteredTodos = todos
      .filter(this.filterByStatus)
      .filter(this.filterByTitle);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <form>
            <label className="TodoList__label">
              Todo filter:
              <input
                onChange={this.onInputHandler}
                className="TodoList__filter"
              />
            </label>

            <label className="TodoList__label">
              Filter by status:
              <select
                className="TodoList__select"
                onChange={event => this.setFilter(event)}
              >
                <option value="all">Show all</option>
                <option value="active">Show active</option>
                <option value="completed">Show completed</option>
              </select>
            </label>
          </form>
          <ul className="TodoList__list">

            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={cn('TodoList__item', {
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                })}
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
                  onClick={() => this.selectUser(todo.id, todo.userId)}
                  className={cn('TodoList__user-button', 'button', {
                    'TodoList__user-button--selected': todo.id === todoId,
                  })}
                  type="button"
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
  onSelectUser: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};
