import { FC } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  setSelectedTodo: (todo: Todo | null) => void;
  selectedTodo: Todo | null;
}

export const TodoItem: FC<Props> = ({
  todo,
  setSelectedTodo,
  selectedTodo,
}) => {
  const isTodoSelected = todo === selectedTodo;

  return (
    <tr
      data-cy="todo"
      className={cn({
        'has-background-info-light': isTodoSelected,
      })}
    >
      <td className="is-vcentered">
        {todo.id}
      </td>

      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>

      <td className="is-vcentered is-expanded">
        <p
          className={cn({
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
          onClick={() => setSelectedTodo(todo)}
        >
          <span className="icon">
            <i className={cn('far', {
              'fa-eye': !isTodoSelected,
              'fa-eye-slash': isTodoSelected,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
