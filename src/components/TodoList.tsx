import React from 'react';
import { TodoItem } from './TodoItem';
import { TodoModified } from '../interfaces/todoModified';

interface Props {
  todos: TodoModified[];
}

export const TodoList: React.FC<Props> = (props) => {
  const { todos } = props;

  return (
    <ul className="todos">
      {todos.map(item => (
        <li key={item.id}>
          <TodoItem {...item} />
        </li>
      ))}
    </ul>
  );
};
