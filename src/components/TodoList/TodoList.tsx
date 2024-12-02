import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  onShowTodo: (todo: Todo | null) => void;
  selectedTodo: Todo | null;
}

export const TodosList: React.FC<Props> = ({
  todos,
  onShowTodo,
  selectedTodo,
}) => (
  <table data-cy="todos-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => (
        <tr key={todo.id} data-cy="todo">
          <td>{todo.id}</td>
          <td>{todo.title}</td>
          <td>
            {todo.completed ? (
              <span data-cy="iconCompleted">✔</span>
            ) : (
              <span data-cy="iconNotCompleted">❌</span>
            )}
          </td>
          <td>
            {selectedTodo?.id === todo.id ? (
              <button
                className="fa-eye-slash"
                data-cy="hideButton"
                onClick={() => onShowTodo(null)}
              >
                Hide
              </button>
            ) : (
              <button
                className="fa-eye"
                data-cy="selectButton"
                onClick={() => onShowTodo(todo)}
              >
                Show
              </button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
