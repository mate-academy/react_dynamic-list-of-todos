import React, { FC } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  isTodoModal: boolean;
  handleDetailsOpen: (todo: Todo) => void;
}

export const TodoComponent: FC<Props> = React.memo(({
  todo,
  isTodoModal,
  handleDetailsOpen,
}) => {
  const {
    id,
    title,
    completed,
  } = todo;

  return (
    <tr data-cy="todo">
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
            'has-text-danger': !completed,
            'has-text-success': completed,
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
          onClick={() => handleDetailsOpen(todo)}
        >
          <span className="icon">
            <i
              className={classNames('far', {
                'fa-eye': !isTodoModal,
                'fa-eye-slash': isTodoModal,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
});
