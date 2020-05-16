import React from 'react';
import { Todo } from './Todo';

type TodoListProps = {
  todos: Todo[];
};

export const TodoList: React.FC<TodoListProps> = ({ todos }) => (
  <ul>
    {todos.map(todo => (
      <Todo
        {...todo}
        key={todo.title}
      />
    ))}
  </ul>
);
