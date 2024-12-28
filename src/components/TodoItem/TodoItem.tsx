import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

interface Props {
  todo: Todo;
  onSelectTodo: (todo: Todo) => void;
  selectedTodo: Todo | null;
}

export const TodoItem: React.FC<Props> = ({
  todo,
  onSelectTodo,
  selectedTodo,
}) => {
  const { id, title, completed } = todo;

  return (
    <tr data-cy="todo" key={todo.id}>
      <td className="is-vcentered">{todo.id}</td>
      {completed ? (
        <>
          <td className="is-vcentered">
            <span className="icon" data-cy="iconCompleted">
              <i className="fas fa-check" />
            </span>
          </td>
          <td className="is-vcentered is-expanded">
            <p className="has-text-success">{title}</p>
          </td>
        </>
      ) : (
        <>
          <td className="is-vcentered"></td>
          <td className="is-vcentered is-expanded">
            <p className="has-text-danger">{title}</p>
          </td>
        </>
      )}

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => onSelectTodo(todo)}
        >
          <span className="icon">
            <i
              className={classNames(
                {
                  'fa-eye-slash': selectedTodo?.id === id,
                  'fa-eye': selectedTodo?.id !== id,
                },
                'far',
              )}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
