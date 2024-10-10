import cn from 'classnames';

import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  onOpenTodoInfo: (todo: Todo) => void;
  currentTodo: Todo | null;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onOpenTodoInfo,
  currentTodo,
}) => {
  const { id, title, completed } = todo;

  return (
    <tr
      data-cy="todo"
      className={cn({
        'has-background-info-light': currentTodo?.id === id,
      })}
    >
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
          onClick={() => {
            onOpenTodoInfo(todo);
          }}
        >
          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye-slash': currentTodo && id === currentTodo.id,
                'fa-eye': !currentTodo || id !== currentTodo.id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
