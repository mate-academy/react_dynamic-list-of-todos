import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type TodoItemProps = {
  todo: Todo;
  selectedTodoId: number | null;
  onShowDetails: (todo: Todo) => void;
};

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  selectedTodoId,
  onShowDetails,
}) => {
  const { completed, title, id } = todo;

  return (
    <tr key={id} data-cy="todo">
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p
          className={classNames({
            'has-text-success': completed,
            'has-text-danger': !completed,
          })}
        >
          {title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => onShowDetails(todo)}
        >
          <span className="icon">
            {selectedTodoId === id ? (
              <i className="far fa-eye-slash" />
            ) : (
              <i className="far fa-eye" />
            )}
          </span>
        </button>
      </td>
    </tr>
  );
};
