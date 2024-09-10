import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

interface Props {
  todo: Todo;
  onSelectedTodo: (todo: Todo) => void;
  selectedTodo: Todo | null;
}

export const TodoItem: React.FC<Props> = ({
  todo,
  onSelectedTodo,
  selectedTodo,
}) => {
  const { id, title, completed } = todo;

  return (
    <tr data-cy="todo" className="">
      <td className="is-vcentered">{id}</td>
      {completed ? (
        <td className="is-vcentered">
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        </td>
      ) : (
        <td className="is-vcentered" />
      )}
      <td className="is-vcentered is-expanded">
        <p
          className={classNames({
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
          onClick={() => onSelectedTodo(todo)}
        >
          <span className="icon">
            <i
              className={classNames({
                'far fa-eye-slash': selectedTodo && id === selectedTodo.id,
                'far fa-eye': !selectedTodo || id !== selectedTodo.id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
