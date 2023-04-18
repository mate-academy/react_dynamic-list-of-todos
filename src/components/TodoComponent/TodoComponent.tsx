import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  isSelectedTodo: boolean;
  onTodoSelected: (todo: Todo) => void;
};

export const TodoComponent: React.FC<Props> = ({
  todo,
  isSelectedTodo,
  onTodoSelected,
}) => {
  const { id, title, completed } = todo;

  return (
    <tr
      key={id}
      data-cy="todo"
    >
      <td className="is-vcentered">
        {id}
      </td>
      <td className="is-vcentered">
        {completed
          && (
            <span className="icon" data-cy="iconCompleted">
              <i className="fas fa-check" />
            </span>
          )}
      </td>
      <td className="is-vcentered is-expanded">
        <p className={classNames(
          { 'has-text-danger': !completed },
          { 'has-text-success': completed },
        )}
        >
          {title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => onTodoSelected(todo)}
        >
          <span className="icon">
            <i className={classNames(
              'far',
              { 'fa-eye': !isSelectedTodo },
              { 'fa-eye-slash': isSelectedTodo },
            )}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
