import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';
import classNames from 'classnames';

export class TodoList extends React.PureComponent {
  state = {
    inputQuery: '',
    selectQuery: '',
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  filterTodos = (todos) => {
    const { inputQuery, selectQuery } = this.state;

    if (selectQuery === 'completed') {
      return todos.filter(todo => todo.completed);
    }

    if (selectQuery === 'active') {
      return todos.filter(todo => !todo.completed);
    }

    return todos.filter(todo => todo.title.includes(inputQuery));
  }

  render() {
    const { handleChange, filterTodos } = this;
    const { inputQuery, selectQuery } = this.state;
    const { todos, onSelectUser } = this.props;

    const filteredTodos = filterTodos(todos);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <input
          type="text"
          name="inputQuery"
          value={inputQuery}
          onChange={handleChange}
        />
        <select
          name="selectQuery"
          value={selectQuery}
          onChange={handleChange}
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
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {!filteredTodos.length && (
              'LOADING...'
            )}
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames('TodoList__item',
                  { 'TodoList__item--checked': todo.completed },
                  { 'TodoList__item--unchecked': !todo.completed })}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={todo.id}
                    readOnly
                  />
                  <p>
                    {todo.title}
                  </p>
                </label>

                <button
                  className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button
                  "
                  type="button"
                  onClick={() => onSelectUser(todo.userId)}
                >
                  {todo.userId}
                </button>
              </li>
            ))}

            <li className="TodoList__item TodoList__item--checked">
              <label>
                <input type="checkbox" checked readOnly />
                <p>distinctio vitae autem nihil ut molestias quo</p>
              </label>

              <button
                className="TodoList__user-button button"
                type="button"
              >
                User&nbsp;#2
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ),
  onSelectUser: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  todos: [],
};
