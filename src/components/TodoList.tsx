import React from 'react';
import { Todo } from '../helpers/api';

type Props = {
  todos: Todo[];
};
export const TodoList: React.FC<Props> = ({ todos }) => (

  <ul className="todos">
    {todos.map(todo => (
      <li
        className="todo"
        key={todo.title}
      >
        <input type="checkbox" checked={todo.completed} disabled />
        {`${todo.title} `}
        <span className="user">
          {todo.user ? todo.user.name : 'Unknown'}
        </span>
      </li>
    ))}
  </ul>
);
