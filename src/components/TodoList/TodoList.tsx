import classNames from 'classnames';
import React from 'react';
import './TodoList.scss';

type Props = {
  handelSelectUser: (userId: number) => void;
  selectedUserId: number;
  todos: Todo[];
};

export class TodoList extends React.Component<Props, {}> {
  state = {
  };

  render(): React.ReactNode {
    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {this.props.todos.map(todo => (
              <li
                key={todo.id}
                className={classNames('TodoList__item', {
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                })}
              >
                <label htmlFor="searchInput">
                  <input
                    checked={todo.completed}
                    type="checkbox"
                    readOnly
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames('TodoList__user-button', 'button', {
                    'TodoList__user-button--selected': todo.userId === this.props.selectedUserId,
                  })}
                  type="button"
                  onClick={() => {
                    this.props.handelSelectUser(todo.userId);
                  }}
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
