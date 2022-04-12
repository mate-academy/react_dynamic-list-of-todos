import React, { Dispatch, memo, SetStateAction } from 'react';
import './TodoList.scss';

enum TodoStatus {
  all,
  active,
  completed,
}

interface Props {
  todos: Todo[],
  selectedUserId: number,
  todoTitle: string,
  todoStatus: TodoStatus,
  onClick: Dispatch<SetStateAction<number>>,
}

export const TodoList: React.FC<Props> = memo(({
  todos,
  selectedUserId,
  todoTitle,
  todoStatus,
  onClick,
}) => {
  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <input
          type="text"
          id="title-input"
          name="title-input"
          value={todoTitle}
        />

        <select>
          <option>
            {123}
          </option>
        </select>
        <ul className="TodoList__list">
          {todos.map(todo => (
            <li
              className={`TodoList__item TodoList__item--${
                todo.completed
                  ? 'checked'
                  : 'unchecked'
              }`}
              key={todo.id}
            >
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                />
                <p>{todo.title}</p>
              </label>

              <button
                className={
                  'TodoList__user-button button '
                  + `TodoList__user-button--${
                    todo.userId === selectedUserId && 'selected'
                  }`
                }
                type="button"
                onClick={() => onClick(todo.userId)}
              >
                {`User #${todo.userId}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});
