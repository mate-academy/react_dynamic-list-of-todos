import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  isSelected: boolean;
  setSelectedTodoId: (todoId: number) => void;
}

export const TodoInfo: React.FC<Props> = ({
  todo,
  isSelected,
  setSelectedTodoId,
}) => {
  const { id, title, completed } = todo;

  return (
    <tr
      data-cy="todo"
      className={cn({
        'has-background-info-light': isSelected,
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
        <p className={cn(
          { 'has-text-success': completed },
          { 'has-text-danger': !completed },
        )}
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
            setSelectedTodoId(id);
          }}
        >
          <span className="icon">
            <i className={cn('far',
              { 'fa-eye-slash': isSelected },
              { 'fa-eye': !isSelected })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
