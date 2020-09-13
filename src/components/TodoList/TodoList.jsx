import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    todos: this.props.todos,
    selectedName: '',
  }



  render() {
    const { getUserId, handleSelected, handleInput, todos } = this.props;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <div>
            <input
              type="text"
              className="input"
              onChange={(event) => handleInput(event.target.value)}
            />
            <select
              onChange={(event) => {
                handleSelected(event.target.value);
              }}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <ul className="TodoList__list">
          {
            todos.map(todo => {
              return (
                <li
                  className= {
                    classNames (
                      "TodoList__item TodoList__item--checked",
                      {"TodoList__item--unchecked": !todo.completed}
                    )}
                  key={todo.id}
                >
                  <label>
                    <input type="checkbox" readOnly />
                    <p>{todo.title}</p>
                  </label>

                  <button
                    className="
                    TodoList__user-button
                    button"
                    type="button"
                    onClick={() => getUserId(todo.userId)}
                  >
                    {`User# ${todo.userId}`}
                  </button>
                </li>
              )
            })
          }
          </ul>
        </div>
      </div>
    );
  };
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    completed: PropTypes.bool.isRequired,
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired
}

