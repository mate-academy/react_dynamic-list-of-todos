import { FC, memo } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  onSelect: (todo: Todo) => void;
  isSelected: boolean;
}

export const TodoElement: FC<Props> = memo(({ todo, onSelect, isSelected }) => {
  const { id, title, completed } = todo;

  return (
    <tr
      data-cy="todo"
      className={cn({ 'has-background-info-light': isSelected })}
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
        <p className={cn({
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
          onClick={() => onSelect(todo)}
        >
          <span className="icon">
            <i className={cn('far', {
              'fa-eye': !isSelected,
              'fa-eye-slash': isSelected,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
});
