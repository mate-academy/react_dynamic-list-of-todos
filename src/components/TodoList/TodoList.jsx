import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class TodoList extends React.PureComponent {
  state = {
    search: '',
    todoStatus: 'all',
    random: null,
  }

  searchHandler = (event) => {
    this.setState({
      search: event.target.value,
    });
  }

  searchFilter = (todos) => {
    if (!todos) {
      return [];
    }

    const { search } = this.state;
    const searchToLower = search.toLowerCase();

    return todos.filter(({ title }) => (
      title && title.toLowerCase().includes(searchToLower)));
  }

  todoStatusHandler = (event) => {
    this.setState({
      todoStatus: event.target.value,
    });
  }

  todosCompletedFilter = (todos) => {
    const { todoStatus } = this.state;

    switch (todoStatus) {
      case 'all':
        return todos;
      case 'active':
        return todos.filter(({ completed }) => !completed);
      case 'inactive':
        return todos.filter(({ completed }) => completed);
      default:
        return todos;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  randomSort(todos) {
    return [...todos].sort(() => 0.5 - Math.random());
  }

  render() {
    const { todos, onChangeUser } = this.props;
    const { search, todoStatus, random } = this.state;
    let todosForShow = this.searchFilter(todos);

    todosForShow = this.todosCompletedFilter(todosForShow);
    if (random) {
      todosForShow = this.randomSort(todosForShow);
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
          onClick={() => this.setState({ random: Math.random() })}
        >
          randomSort
        </button>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todosForShow.map(todo => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
                  {
                    'TodoList__item--unchecked': !todo.completed,
                    'TodoList__item--checked': todo.completed,
                  },
                )}
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
                  // eslint-disable-next-line max-len
                  className="TodoList__user-button TodoList__user-button--selected button"
                  type="button"
                  onClick={() => onChangeUser(todo.userId)}
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
  onChangeUser: PropTypes.func.isRequired,
};

export default TodoList;
