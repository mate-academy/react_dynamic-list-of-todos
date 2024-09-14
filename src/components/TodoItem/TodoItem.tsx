import { FC } from 'react';
import cn from 'classnames';

import { Todo } from './../../types/Todo';

interface Props {
  todo: Todo;
  selectedTodo: Todo | null;
  onSelectTodo: (todo: Todo) => void;
}

export const TodoItem: FC<Props> = ({ todo, selectedTodo, onSelectTodo }) => {
  const { id, title, completed } = todo;

  return (
    <tr data-cy="todo" className="">
      <td className="is-vcentered">{id}</td>

      {!completed ? (
        <td className="is-vcentered" />
      ) : (
        <td className="is-vcentered">
          <span data-cy="iconCompleted" className="icon">
            <i className="fas fa-check" />
          </span>
        </td>
      )}

      {/* <td className="is-vcentered" /> */}
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
          onClick={() => onSelectTodo(todo)}
        >
          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye-slash': selectedTodo && id === selectedTodo.id,
                'fa-eye': !selectedTodo || id !== selectedTodo.id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
