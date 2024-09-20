import React from 'react';
import { Todo } from '../types/Todo';

interface TodoItemProps {
  todo: Todo;
  onTodoSelect: (todo: Todo) => void;
  selectedTodo: Todo | null;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onTodoSelect,
  selectedTodo,
}) => (
  <tr data-cy="todo">
    <td className="is-vcentered">{todo.id}</td>
    <td className="is-vcentered">
      {todo.completed && (
        <span className="icon" data-cy="iconCompleted">
          <i className="fas fa-check" />
        </span>
      )}
    </td>
    <td className="is-vcentered is-expanded">
      <p className={todo.completed ? 'has-text-success' : 'has-text-danger'}>
        {todo.title}
      </p>
    </td>
    <td className="has-text-right is-vcentered">
      <button
        data-cy="selectButton"
        className="button"
        type="button"
        onClick={() => onTodoSelect(todo)}
      >
        <span className="icon">
          {selectedTodo?.id === todo.id ? (
            <i className="far fa-eye-slash" />
          ) : (
            <i className="far fa-eye" />
          )}
        </span>
      </button>
    </td>
  </tr>
);
