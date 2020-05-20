import React from 'react';
import { Todo } from './helpers/api';

type Props = {
  todo: Todo;
};

export const TodoCard: React.FC<Props> = ({ todo }) => (
  <div className="Todo">
    <h2 className="Todo__title">{todo.title}</h2>
    <input type="checkbox" checked={todo.completed} disabled />
    <strong className="Todo__user">{todo.user ? todo.user.name : 'Unknown'}</strong>
  </div>
);
