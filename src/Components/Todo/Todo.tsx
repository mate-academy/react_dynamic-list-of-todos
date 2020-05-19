import React from 'react';
import Todo from '../../Helpers/api';

type Props = {
  todo: Todo;
};

export const TodoCard: React.FC<Props> = ({ todo }) => (
  <li
    key={todo.id}
    className="todo__item"
  >
    <p>{todo.title}</p>
    <p>{todo.user && todo.user.name}</p>
    {todo.completed ? (
      <p>Done</p>
    ) : (
      <p>In Progress</p>
    )}
  </li>
);
