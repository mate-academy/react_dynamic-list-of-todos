import React from 'react';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC<{
  todos: Todo[];
  onTodoSelect: (todo: Todo) => void;
  selectedTodo: Todo | null;
}> = ({ todos, onTodoSelect, selectedTodo }) => (
  <tbody>
    {todos.map(({ id, title, completed }) => (
      <tr key={id} data-cy="todo">
        <td data-cy="todo-id">{id}</td>
        {completed && (
          <td data-cy="iconCompleted">
            <span className="icon has-text-success">
              <i className="fas fa-check" />
            </span>
          </td>
        )}
        <td data-cy="todo-title">{title}</td>
        <td className="has-text-right">
          <button
            type="button"
            className="button is-small"
            data-cy="selectButton"
            onClick={() => onTodoSelect(todos.find(t => t.id === id)!)}
          >
            <i
              className={`fas ${selectedTodo?.id === id ? 'fa-eye-slash' : 'fa-eye'}`}
            />
          </button>
        </td>
      </tr>
    ))}
  </tbody>
);
