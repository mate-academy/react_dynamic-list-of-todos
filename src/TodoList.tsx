import React from 'react';

import { TodoListProps } from './types';


const TodoList: React.FC<TodoListProps> = (props: TodoListProps) => {
  return (
    <ul>
      {props.todos.map((todo) => (
        <li
          key={todo.id}
        >
          <p>
            <strong>Description: </strong>
            {todo.title}
          </p>
          <p>
            <strong>Completed: </strong>
            {todo.completed.toString()}
          </p>
          <p>
            <strong>User: </strong>
            {todo.user.name}
          </p>
        </li>
      ))}
    </ul>

  );
};

export default TodoList;
