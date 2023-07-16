import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  isTodoSelected: boolean;
  onTodoSelect: (todo: Todo) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  isTodoSelected,
  onTodoSelect,
}) => {
  return (
    <tr data-cy="todo" className="">
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p className={cn({
          'has-text-success': todo.completed,
          'has-text-danger': !todo.completed,
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
          onClick={() => onTodoSelect(todo)}
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
