import React from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  activeTodo: Todo | null,
  onModalOpen: (todo: Todo) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  activeTodo,
  onModalOpen,
}) => {
  const {
    id,
    title,
    completed,
  } = todo;
  const isSelectedTodo = id === activeTodo?.id;

  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': isSelectedTodo,
      })}
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
          onClick={() => onModalOpen(todo)}
        >
          <span className="icon">
            <i
              className={classNames('far', {
                'fa-eye': id !== activeTodo?.id,
                'fa-eye-slash': isSelectedTodo,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
