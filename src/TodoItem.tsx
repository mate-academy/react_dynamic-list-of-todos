import React from 'react';
import { Todo } from './types';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  return (
    <>
      <td>{ `${todo.completed}` }</td>
      <td>{ todo.title }</td>
    </>
  );
};