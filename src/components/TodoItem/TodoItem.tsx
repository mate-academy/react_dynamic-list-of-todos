import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  onOpen: (userId: number, todo: Todo) => void;
  selectedTodo: Todo | null;
}

export const TodoItem: React.FC<Props> = ({
  todo,
  onOpen,
  selectedTodo,
}) => {
  const {
    id,
    completed,
    title,
    userId,
  } = todo;

  return (
    <tr key={id} data-cy="todo">
      <td className="is-vcentered">{id}</td>
      {
        !completed
          ? <td className="is-vcentered" />
          : (
            <td className="is-vcentered">
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            </td>
          )
      }

      <td className="is-vcentered is-expanded">
        <p
          className={cn({
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
          onClick={() => {
            onOpen(userId, todo);
          }}
        >
          <span className="icon">
            <i className={cn('far', {
              'fa-eye-slash': selectedTodo?.id === id,
              'fa-eye': selectedTodo?.id !== id,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
