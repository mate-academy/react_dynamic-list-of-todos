/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import React, { useState } from 'react';
import classNames from 'classnames';

import './TodoList.scss';

type Todo = {
  id: number;
  createdAt: string;
  upDatedAt: string;
  userId: number;
  title: string;
  completed: boolean;
};

type Props = {
  todos: Todo[]
  onSelect: (selectedId: number) => void
};

export const TodoList: React.FC <Props> = (
  {
    todos,
    onSelect,
  },
) => {
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <ul
          className="TodoList__list"
          data-cy="listOfTodos"
        >
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={classNames({ TodoList__item: true },
                { 'TodoList__item--unchecked': todo.completed === false },
                { 'TodoList__item--checked': todo.completed === true })}
            >
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed ? true : false}
                  readOnly
                />
                <p>{todo.title}</p>
              </label>

              {selectedTodoId === todo.userId ? (
                <button
                  className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button
                  "
                  type="button"
                  data-cy="userButton"
                  onClick={() => {
                    onSelect(todo.userId);
                    setSelectedTodoId(todo.userId);
                  }}
                >
                  {`User # ${todo.userId}`}
                </button>
              ) : (
                <button
                  className="
                    TodoList__user-button
                    button
                  "
                  type="button"
                  data-cy="userButton"
                  onClick={() => {
                    onSelect(todo.userId);
                    setSelectedTodoId(todo.userId);
                  }}
                >
                  {`User # ${todo.userId}`}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
