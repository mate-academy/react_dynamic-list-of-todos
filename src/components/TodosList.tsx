import React, { FC } from 'react';

import { CompleteTodo } from '../constants/types';
import './TodoList.css';

interface Props {
  todos: CompleteTodo[];
}

export const TodosList: FC<Props> = (props) => {
  const { todos } = props;

  return (
    <ul>
      {todos.map(todo => (
        <li
          key={todo.id}
          className="todo-item"
        >
          <span>{todo.title}</span>
          <span>{todo.user.name}</span>
        </li>
      ))}
    </ul>
  );
};
