import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export class TodoList extends React.Component {
  state = {
    query: '',
    selectedOption: '',
  }

  render() {
    const { todos, userId, onSelection, todoId } = this.props;
    const { query, selectedOption } = this.state;

    let filteredTodos = todos;

    if (selectedOption === 'active') {
      filteredTodos = todos
        .filter(todo => !todo.completed);
    }

    if (selectedOption === 'completed') {
      filteredTodos = todos
        .filter(todo => todo.completed);
    }

    if (query) {
      const lowerCaseQuery = query.toLowerCase();

      filteredTodos = filteredTodos
        .filter(todo => (
          todo.title.toLowerCase().includes(lowerCaseQuery)
        ));
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <form className="TodoList__form">
          <input
            type="text"
            id="search-query"
            className="TodoList__input"
            placeholder="Type search word"
            value={query}
            onChange={event => (
              this.setState({ query: event.target.value })
            )}
          />

          <select
            name="select"
            value={selectedOption}
            className="TodoList__select"
            onChange={event => (
              this.setState({ selectedOption: event.target.value })
            )}
          >
            <option value="all">
              Show all
            </option>

            <option value="active">
              Show active
            </option>

            <option value="completed">
              Show completed
            </option>
          </select>
        </form>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames('TodoList__item', {
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                })}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onClick={!todo.completed}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames('TodoList__user-button', {
                    'TodoList__user-button--selected': todo.userId === userId
                      && todo.id === todoId,
                  }, 'button')}
                  type="button"
                  onClick={() => onSelection(todo.userId, todo.id)}
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
  todos: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  userId: PropTypes.number.isRequired,
  onSelection: PropTypes.func.isRequired,
  todoId: PropTypes.number.isRequired,
};
