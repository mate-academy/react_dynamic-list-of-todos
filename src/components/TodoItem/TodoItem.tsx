import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  selectedTodo: Todo | null;
  onSelectTodo: (todo: Todo) => void;
}

export const TodoItem: React.FC<Props> = ({
  todo,
  onSelectTodo,
  selectedTodo,
}) => {
  const { id, title, completed } = todo;

  return (
    <tr
      data-cy="todo"
      className={selectedTodo?.id === id ? 'has-background-info-light' : ''}
    >
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p className={completed ? 'has-text-success' : 'has-text-danger'}>
          {title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => onSelectTodo(todo)}
        >
          <span className="icon">
            <i
              className={
                selectedTodo?.id === id ? 'far fa-eye-slash' : 'far fa-eye'
              }
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
