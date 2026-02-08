import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  isSelected: boolean;
  onSelectTodo: () => void;
};

export const TodoListItem: React.FC<Props> = ({
  todo,
  isSelected,
  onSelectTodo,
}) => {
  return (
    <tr data-cy="todo">
      <td className="is-vcentered">{todo.id}</td>

      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon has-text-success" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>

      <td className="is-vcentered is-expanded">
        <p
          className={classNames({
            'has-text-success': todo.completed,
            'has-text-danger': !todo.completed,
          })}
        >
          {todo.title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        {!isSelected ? (
          <button
            data-cy="selectButton"
            className="button"
            type="button"
            onClick={onSelectTodo}
          >
            <span className="icon">
              <i className="far fa-eye" />
            </span>
          </button>
        ) : (
          <button
            data-cy="unselectButton"
            className="button"
            type="button"
            onClick={onSelectTodo}
          >
            <span className="icon">
              <i className="far fa-eye-slash" />
            </span>
          </button>
        )}
      </td>
    </tr>
  );
};
