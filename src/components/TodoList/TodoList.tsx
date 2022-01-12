import classNames from 'classnames';
import React from 'react';
import './TodoList.scss';

type Props = {
  todos: Todo[],
  selectUser: (id: number) => void,
  selectedUserId: number,
};

export class TodoList extends React.Component<Props, {}> {
  state = {};

  render() {
    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {this.props.todos.map(todo => (
              <li
                className={
                  classNames('TodoList__item', {
                    'TodoList__item--unchecked': !todo.completed,
                    'TodoList__item--checked': todo.completed,
                  })
                }
                key={todo.id}
              >
                <label htmlFor="todoStatus">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    readOnly
                  />
                  <p>{todo.title}</p>
                </label>
                <button
                  className={
                    classNames('TodoList__user-button',
                      'button', {
                        'TodoList__user-button--selected': this.props.selectedUserId === todo.userId,
                      })
                  }
                  type="button"
                  onClick={() => this.props.selectUser(todo.userId)}
                >
                  User&nbsp;
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
