import cn from 'classnames';

import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  modalTodo: Todo | null;
  setModalTodo: (todo: Todo) => void;
};

export const TodoInfo: React.FC<Props> = ({
  todo,
  modalTodo,
  setModalTodo,
}) => {
  const { id, title, completed } = todo;
  const isModalTodo = modalTodo?.id === id;

  return (
    <tr data-cy="todo" className="">
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
          className={cn({
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
          onClick={() => setModalTodo(todo)}
        >
          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye-slash': isModalTodo,
                'fa-eye': !isModalTodo,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
