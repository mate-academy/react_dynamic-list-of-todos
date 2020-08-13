import React from 'react';
import { Todo, User } from '../interfaces';

interface Props {
  todo: Todo;
  user: User;
}

const TodoItem: React.FC<Props> = ({ todo, user }) => {
  return (
    <li className={todo.completed ? 'completed' : ''}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`todo-${todo.id}`}
          checked={todo.completed}
        />
        <label
          htmlFor={`todo-${todo.id}`}
        >
          {user.name}
          {' - '}
          {todo.title}
        </label>
      </div>
    </li>
  );
};

export default TodoItem;
