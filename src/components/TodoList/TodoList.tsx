import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onShow: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({ todos, onShow }) => {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo.id}>
          <span>{todo.title}</span>
          <button type="button" onClick={() => onShow(todo)}>
            Show {/* updated from "Details" to match spec */}
          </button>
        </li>
      ))}
    </ul>
  );
};
