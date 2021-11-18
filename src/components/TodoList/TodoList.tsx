import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  onChecked: (userId: number) => void,
  selectedUserId: number,
};

export const TodoList: React.FC<Props> = ({ todos, onChecked, selectedUserId }) => (
  <div className="TodoList">
    <h2>Todos:</h2>
    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={classNames('TodoList__item', { TodoList__item__unchecked: todo.completed === false }, { TodoList__item__checked: todo.completed === true })}
          >
            { /*eslint-disable*/
              <label>
                <input type="checkbox" readOnly />
                <p>{todo.title}</p>
              </label>
            }
            <button
              className={classNames('TodoList__user-button',
                'button',
                { TodoList__user_button__selected: todo.userId === selectedUserId })}
              type="button"
              onClick={() => onChecked(todo.userId)}
            >
              User
              {' '}
              {todo.userId}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
