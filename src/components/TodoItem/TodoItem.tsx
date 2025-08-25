import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  showTodoModal: (todo: Todo) => void;
  isSelected: boolean;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  showTodoModal,
  isSelected,
}) => {
  return (
    <tr data-cy="todo">
      <td className="is-vcentered">{todo.id}</td>
      {todo.completed ? (
        <td className="is-vcentered">
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        </td>
      ) : (
        <td className="is-vcentered" />
      )}

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
          onClick={() => showTodoModal(todo)}
        >
          <span className="icon">
            <i className={isSelected ? 'far fa-eye-slash' : 'far fa-eye'} />
          </span>
        </button>
      </td>
    </tr>
  );
};
