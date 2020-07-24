import React from 'react';
import { TodoWithUser } from './interfaces';

interface TodoListProps {
  todos: TodoWithUser[];
}

export const TodosList: React.FC<TodoListProps> = ({ todos }) => (
  <ul>
    {todos.map(todo => (
      <li className="App_todo" key={todo.id}>
        <span>{todo.user.name}</span>
        <span>
          <input
            className="App_checkbox"
            type="checkbox"
            checked={todo.completed === true}
          />
          {todo.title}
        </span>
      </li>
    ))}
  </ul>
);
