import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  onShowTodo: (todo: Todo) => void;
  isTodoSelected: (id: number) => boolean;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onShowTodo,
  isTodoSelected,
}) => {
  const {
    id,
    title,
    completed,
  } = todo;

  return (
    <>
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="far fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p
          className={classNames({
            'has-text-danger': !completed,
            'has-text-succes': completed,
          })}
        >
          {title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        {isTodoSelected(id) ? (
          <button
            data-cy="selectButton"
            className="button"
            type="button"
            onClick={() => onShowTodo(todo)}
          >
            <span className="icon">
              <i className="far fa-eye" />
            </span>
          </button>
        ) : (
          <button
            data-cy="selectButton"
            className="button"
            type="button"
          >
            <span className="icon">
              <i className="far fa-eye" />
            </span>
          </button>
        )}
      </td>
    </>
  );
};
