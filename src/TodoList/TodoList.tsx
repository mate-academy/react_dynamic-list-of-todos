import React, { FC } from 'react';
import { TodoWithUser } from '../api';

interface Props {
  todos: TodoWithUser[];
  sort(string: string): void;
}

export const TodoList: FC<Props> = (props) => {
  const { todos, sort } = props;

  return (
    <>
      <button
        type="button"
        onClick={() => sort('by title')}
      >
      Sort by title
      </button>
      <button
        type="button"
        onClick={() => sort('by completed')}
      >
      Sort by completed
      </button>
      <button
        type="button"
        onClick={() => sort('by name')}
      >
      Sort by name
      </button>
      <table>
        <thead>
          <tr>
            <th>
              USER
            </th>
            <th>
              TITLE
            </th>
            <th>
              COMPLETED
            </th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.id}>
              <td>
                {todo.user.name}
              </td>
              <td>
                {todo.title}
              </td>
              <td>
                {todo.completed ? 'Doned' : 'In process'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </>
  );
};
