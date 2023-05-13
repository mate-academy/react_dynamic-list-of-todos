import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  selectedTodoId?: number;
  onSelectTodo: (todo: Todo) => void;
}

export const TodoInfo: React.FC<Props> = ({
  todo,
  selectedTodoId,
  onSelectTodo,
}) => {
  const {
    id,
    title,
    completed,
  } = todo;

  const isTodoSelected = (id === selectedTodoId);

  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': isTodoSelected,
      })}
    >
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        <span className="icon">
          <i className={classNames({
            'fas fa-check': completed,
          })}
          />
        </span>
      </td>
      <td className="is-vcentered is-expanded">
        <p className={classNames({
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
          onClick={() => onSelectTodo(todo)}
        >
          <span className="icon">
            {isTodoSelected
              ? <i className="far fa-eye-slash" />
              : <i className="far fa-eye" />}
          </span>
        </button>
      </td>
    </tr>
  );
};
