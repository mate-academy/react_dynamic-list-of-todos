import React from 'react';
import classNames from 'classnames';
import './TodoList.scss';

export class TodoList extends React.Component {
  render() {
    return (
      <div className="TodoList">
        <h2>Todos:</h2>
    
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {
              this.props.todos.map(todo => (
                <li
                  key={todo.id}
                  className={classNames({
                    "TodoList__item": true,
                    "TodoList__item--checked": todo.completed,
                    "TodoList__item--unchecked": !todo.completed,
                  })}
                >
                  <label>
                    {todo.completed ? (
                      <input
                        type="checkbox"
                        checked
                        readOnly
                      />
                    ) : (
                      <input
                        type="checkbox"
                        readOnly
                      />
                    )}
                    <p>{todo.title}</p>
                  </label>
      
                  <button
                    className="
                      TodoList__user-button
                      button
                    "
                    type="button"
                    onClick={() => this.props.selectUser(todo.userId)}
                  >
                    {`User #${todo.userId}`}
                  </button>
                </li>
              ))
            }
          </ul>
        </div>
        
      </div>
    )
  }
}
