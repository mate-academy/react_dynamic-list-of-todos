import React, { FC } from 'react';
import { Todo } from '../interfaces/interfaces';

interface Props {
  todosList: Todo[];
}

export const TodoList: FC<Props> = (props) => {
  const { todosList } = props;

  return (
    <table className="table table-hover">
      <tbody>
        {todosList.map(todo => (
          <tr key={todo.id}>
            <th scope="row">{todo.completed ? 'Done' : 'Undone'}</th>
            <td>{todo.title}</td>
            <td>{todo.user.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
