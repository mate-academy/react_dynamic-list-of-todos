import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {

  }

  render() {
    const { todos } = this.props;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todos.map(todo => (
              <li
                key={todo.id}
                className="TodoList__item TodoList__item--unchecked"
              >
                <label>
                  <input
                    type="checkbox"
                    readOnly
                    checked={todo.completed}
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
                  onClick={() => this.props.setUserId(todo.userId)}
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
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  })).isRequired,

  setUserId: PropTypes.func.isRequired,
};
