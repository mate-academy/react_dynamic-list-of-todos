import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  selectedTodoId?: number | null;
  onSelectTodoId: (id: number | null) => void;
};

export const TodoInfo: React.FC<Props> = ({
  todo,
  selectedTodoId,
  onSelectTodoId,
}) => {
  const handleSelect = () => {
    onSelectTodoId(todo.id);
  };

  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': selectedTodoId === todo.id,
      })}
    >
      <td className="is-vcentered">{todo.id}</td>

      <td className="is-vcentered">
        {todo.completed ? (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        ) : null}
      </td>

      <td className="is-vcentered is-expanded">
        <p
          className={classNames({
            'has-text-danger': !todo.completed,
            'has-text-success': todo.completed,
          })}
        >
          {todo.title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={handleSelect}
        >
          <span className="icon">
            <i
              className={classNames('far', {
                'fa-eye': selectedTodoId !== todo.id,
                'fa-eye-slash': selectedTodoId === todo.id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
