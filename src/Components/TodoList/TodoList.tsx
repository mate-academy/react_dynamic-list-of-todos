import React, { FC } from 'react';
import { Todo } from '../interfaces/interfaces';

interface Props {
  todosList: Todo[];
}

export const TodoList: FC<Props> = (props) => {
  const { todosList } = props;

  return (
    <ul>
      {todosList.map(todo => (
        <li key={todo.id}>
          {todo.title}
        </li>
      ))}
    </ul>
  );
};
