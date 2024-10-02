import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todo: Todo;
  selectTodo: (todo: Todo) => void;
  selectedTodoId: number | undefined;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  selectedTodoId,
  selectTodo,
}) => {
  const { id, title, completed } = todo;

  return (
    <tr data-cy="todo" key={id}>
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
          onClick={() => selectTodo(todo)}
        >
          <span className="icon">
            <i
              className={classNames('far', {
                'fa-eye-slash': selectedTodoId === id,
                'fa-eye': selectedTodoId !== id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
