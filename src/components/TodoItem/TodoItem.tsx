import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  selectedTodo: Todo | null,
  onSelect(userId: number, todo: Todo | null): void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  selectedTodo,
  onSelect,
}) => {
  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': selectedTodo?.id === todo.id,
      })}
    >
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p
          className={classNames({
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
          onClick={() => onSelect(todo.userId, todo)}
        >
          <span className="icon">
            <i className={classNames('far', {
              'fa-eye': selectedTodo?.id !== todo.id,
              'fa-eye-slash': selectedTodo?.id === todo.id,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
