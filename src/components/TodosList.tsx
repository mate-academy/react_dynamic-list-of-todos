import React, { FC } from 'react';
import { CompleteTodo } from '../constants/types';

interface Props {
  todos: CompleteTodo[];
}

export const TodosList: FC<Props> = (props) => {
  const { todos } = props;

  return (
    <ul>
      {todos.map((todo: CompleteTodo) => (
        <li key={todo.id}>
          <span>{todo.title}</span>
          <span>{todo.user.name}</span>
        </li>
      ))}
    </ul>
  );
};
