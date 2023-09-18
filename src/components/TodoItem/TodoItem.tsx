import React from 'react';
import classnames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  onToggleModal: (todo:Todo | null) => void;
  selectedTodoId: number | undefined;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onToggleModal,
  selectedTodoId,
}) => {
  const { completed, id, title } = todo;

  return (
    <tr
      data-cy="todo"
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
        <p
          className={
            classnames({
              'has-text-danger': !completed,
              'has-text-success': completed,
            })
          }
        >
          {title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => onToggleModal(todo)}
        >
          <span className="icon">
            <i className={classnames('far', {
              'fa-eye': selectedTodoId !== id,
              'fa-eye-slash': selectedTodoId === id,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
