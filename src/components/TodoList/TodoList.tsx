import React, { FC } from 'react';
import { TodosWithUser } from '../../interfaces';
import { TodoItem } from '../TodoItem/TodoItem';

interface Props {
  todos: TodosWithUser[];
}

export const TodoList: FC<Props> = ({ todos }) => (
  <ul className="list">
    {todos.map(task => (
      <li key={task.id} className="listItem">
        <TodoItem todo={task} />
      </li>
    ))}
  </ul>
);
