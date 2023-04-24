import cn from 'classnames';

import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  selectedTodo: Todo | null,
  onClick: (id: number, todo: Todo) => void
};

export const TodoInfo: React.FC<Props> = ({
  todo,
  onClick,
  selectedTodo,
}) => {
  const {
    id,
    title,
    completed,
    userId,
  } = todo;

  const textClassName = completed
    ? 'has-text-success'
    : 'has-text-danger';

  return (
    <tr
      data-cy="todo"
      className={cn({
        'has-background-info-light': selectedTodo?.id === id,
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
        <p className={textClassName}>{title}</p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => onClick(userId, todo)}
        >
          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye': selectedTodo?.id !== id,
                'fa-eye-slash': selectedTodo?.id === id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
