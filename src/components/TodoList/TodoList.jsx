import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export class TodoList extends React.Component {
  state = {
    todosSelected: 'all',
    searchTitle: '',
  }

  handleSelect = (value) => {
    this.setState({
      todosSelected: value,
    });
  }

  handleSerch = (value) => {
    this.setState({
      searchTitle: value,
    });
  }

  filteredByTitle = (todo) => {
    const { searchTitle } = this.state;

    if (todo.title !== null) {
      return todo.title.toLowerCase().includes(searchTitle.toLowerCase());
    }

    return false;
  }

  filteredByStatus = (todo) => {
    const { todosSelected } = this.state;

    switch (todosSelected) {
      case 'completed':
        return todo.completed;
      case 'active':
        return !todo.completed;
      default:
        return true;
    }
  }

  render() {
    const { todos, checkedHandler, handlerSelectUserId } = this.props;
    const { searchTitle } = this.state;
    const filterTodos = todos
      .filter(this.filteredByStatus)
      .filter(this.filteredByTitle);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <form className="TodoList__form">
          <select
            className="TodoList__input"
            onChange={(e) => {
              this.handleSelect(e.target.value);
            }}
          >
            <option value="all">all</option>
            <option value="active">active</option>
            <option value="completed">completed</option>
          </select>
          <input
            type="text"
            value={searchTitle}
            className="TodoList__input"
            placeholder="search by title"
            onChange={(e) => {
              this.handleSerch(e.target.value);
            }}
          />
        </form>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filterTodos.map(todo => (
              <li
                className={
                  classNames('TodoList__item',
                    'TodoList__item--checked',
                    {
                      'TodoList__item--unchecked':
                        !todo.completed,
                    })
                }
                key={todo.id}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    readOnly
                    onChange={() => checkedHandler(todo.id)}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button
                  "
                  type="button"
                  onClick={() => handlerSelectUserId(todo.userId)}
                >
                  User #
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
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    userId: PropTypes.number.isRequired,
  })).isRequired,
  checkedHandler: PropTypes.func.isRequired,
  handlerSelectUserId: PropTypes.func.isRequired,
};
