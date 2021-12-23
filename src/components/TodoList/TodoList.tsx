import React from 'react';
import './TodoList.scss';
import { Todo } from '../../types';

interface Props {
  todos: Todo[];
  onSelectUser(userId: number): void;
  selectedUserId: number;
}

export const TodoList: React.FC<Props> = ({ todos, onSelectUser, selectedUserId }) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map((todo) => {
          const rootClasses = ['TodoList__item'];

          if (todo.completed) {
            rootClasses.push('TodoList__item--checked');
          } else {
            rootClasses.push('TodoList__item--unchecked');
          }

          const buttonClasses = ['TodoList__user-button', 'button'];

          if (selectedUserId === todo.userId) {
            buttonClasses.push('TodoList__user-button--selected');
          }

          return (
            <li key={todo.id} className={rootClasses.join(' ')}>
              <input type="checkbox" readOnly checked={todo.completed} />
              <p>{todo.title}</p>

              <button
                className={buttonClasses.join(' ')}
                type="button"
                onClick={() => onSelectUser(todo.userId)}
              >
                User&nbsp;#
                {todo.userId}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  </div>
);
