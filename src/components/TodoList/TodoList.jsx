import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';

export class TodoList extends React.Component {
  state = {
    filterStr: '',
    select: 'all',
  };

  render() {
    const { filterStr, select } = this.state;
    const { todos, selectUser, checkHandler } = this.props;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <input
          className="TodoList__filter"
          value={filterStr}
          placeholder="Filter todos"
          onChange={({ target }) => {
            this.setState({ filterStr: target.value });
          }}
        />
        <select
          className="TodoList__select"
          onChange={({ target }) => {
            this.setState({ select: target.value });
          }}
        >
          <option value="all"> all </option>
          <option value="active"> active </option>
          <option value="completed"> completed </option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todos
              .filter((todo) => {
                switch (select) {
                  case 'active':
                    return !todo.completed;
                  case 'completed':
                    return todo.completed;
                  default:
                    return todo;
                }
              })
              .filter(todo => todo.title
                && todo.title.toLowerCase().includes(filterStr.toLowerCase()))
              .map(todo => (
                <li
                  key={todo.id}
                  className={`TodoList__item ${todo.completed
                    ? 'TodoList__item--checked'
                    : 'TodoList__item--unchecked'}`}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => checkHandler(todo.id)}
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
                    onClick={() => selectUser(todo.userId)}
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
    userId: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  })).isRequired,
  checkHandler: PropTypes.func.isRequired,
  selectUser: PropTypes.func.isRequired,
};
