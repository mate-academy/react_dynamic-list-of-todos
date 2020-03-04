import React, { FC } from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { UsersTodo } from '../types';

interface Props {
  todos: UsersTodo[];
}

export const TodoList: FC<Props> = ({ todos }) => (
  <ul style={{ listStyle: 'none' }}>
    {todos.map(todo => (
      <li key={todo.id} style={{ border: '1px solid black' }}>
        <TodoItem todo={todo} />
      </li>
    ))}
  </ul>
);
