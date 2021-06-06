import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class TodoList extends React.PureComponent {
  state = {
    search: '',
    todoStatus: 'all',
    isShuffle: false,
  }

  searchHandler = (event) => {
    this.setState({
      search: event.target.value,
    });
  }

  getTodosForShow = (todos) => {
    if (!todos) {
      return [];
    }

    const { search } = this.state;
    const searchToLower = search.toLowerCase();

    const todosWithSearchFilter = todos.filter(({ title }) => (
      title && title.toLowerCase().includes(searchToLower)));

    return this.todosCompletedFilter(todosWithSearchFilter);
  }

  todoStatusHandler = (event) => {
    this.setState({
      todoStatus: event.target.value,
    });
  }

  todosCompletedFilter = (todos) => {
    const { todoStatus } = this.state;

    switch (todoStatus) {
      case 'active':
        return todos.filter(({ completed }) => !completed);

      case 'inactive':
        return todos.filter(({ completed }) => completed);

      case 'all':
      default:
        return todos;
    }
  }

  render() {
    const { todos, onUserChange, selectedUserId } = this.props;
    const { search, todoStatus, isShuffle } = this.state;
    let todosForShow = this.getTodosForShow(todos);

    if (isShuffle) {
      todosForShow = randomSort(todosForShow);
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <input
          type="text"
          value={search}
          onChange={this.searchHandler}
          placeholder="search"
        />

        <select
          name="todoStatus"
          onChange={this.todoStatusHandler}
          value={todoStatus}
        >
          <option value="all">All</option>
          <option value="active">active</option>
          <option value="inactive">completed</option>
        </select>

        <button
          type="button"
          onClick={() => this.setState({ isShuffle: Math.random() })}
        >
          randomSort
        </button>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todosForShow.map(todo => (
              <li
                key={todo.id}
                className={classNames('TodoList__item',
                  {
                    'TodoList__item--unchecked': !todo.completed,
                    'TodoList__item--checked': todo.completed,
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
                  className={classNames(
                    'TodoList__user-button button',
                    {
                      // eslint-disable-next-line max-len
                      'TodoList__user-button--selected': selectedUserId === todo.userId,
                    },
                  )}
                  type="button"
                  onClick={() => onUserChange(todo.userId)}
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
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    completed: PropTypes.bool,
  })).isRequired,
  onUserChange: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
};

function randomSort(todos) {
  return [...todos].sort(() => 0.5 - Math.random());
}

export default TodoList;
