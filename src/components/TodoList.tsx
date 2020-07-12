import React from 'react';
import { TodoItem } from './TodoItem';
import { TodoModified } from '../interfaces/todoModified';

interface TodoListProps {
  todos: TodoModified[];
}

export const TodoList: React.FC<TodoListProps> = (props) => {
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
