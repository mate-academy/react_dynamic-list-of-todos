import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  isSelected: boolean;
  selectTodoWithUser: (newSelectedTodo: Todo) => void;
};

export const TodoInfo: React.FC<Props> = React.memo(({
  todo,
  isSelected,
  selectTodoWithUser,
}) => {
  const {
    id,
    title,
    completed,
  } = todo;

  return (
    <tr
      data-cy="todo"
      className={classNames(
        {
          'has-background-info-light': isSelected,
        },
      )}
    >
      <td className="is-vcentered">
        {id}
      </td>

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
          onClick={() => selectTodoWithUser(todo)}
        >
          <span className="icon">
            <i className={classNames(
              'far',
              'fa-eye',
              {
                'fa-eye-slash': isSelected,
              },
            )}
            />
          </span>
        </button>
      </td>
    </tr>
  );
});
