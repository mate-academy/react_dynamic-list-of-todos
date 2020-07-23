import React, { FC } from 'react';
import { Todo } from '../interfaces/TodoInterface';

type Props = {
  todos: Todo[];
  sortCompleted(): void;
  sortByTitle(): void;
  sortByUser(): void;
};

export const TodoList: FC<Props> = ({
  todos, sortCompleted, sortByTitle, sortByUser,
}) => {
  return (
    <>
      <button type="button" onClick={() => sortCompleted()}>Completed</button>
      <button type="button" onClick={() => sortByTitle()}>A-Z</button>
      <button type="button" onClick={() => sortByUser()}>User</button>
      <ul>
        {todos.map((todo: Todo) => (
          <li key={todo.id}>
            <div>
              {
                todo.completed
                  ? <input type="checkbox" checked />
                  : <input type="checkbox" disabled />
              }
            </div>
            <div>{todo.title}</div>
            <div>{todo.user?.name}</div>
          </li>
        ))}
      </ul>
    </>
  );
};
