import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  selectedTodo: Todo | null;
  onSelectedTodo: (todo: Todo) => void;
};

export const TodoItem:React.FC<Props> = ({
  todo,
  selectedTodo,
  onSelectedTodo,
}) => {
  const { id, title, completed } = todo;

  return (
    <tr data-cy="todo" className="has-background-info-lightDELE">
      <td className="is-vcentered">
        {id}
      </td>
      {completed ? (
        <td className="is-vcentered">
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        </td>
      ) : (
        <td className="is-vcentered" />
      )}

      <td className="is-vcentered is-expanded">
        <p className={cn({
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
          onClick={() => onSelectedTodo(todo)}
        >
          <span className="icon">
            <i
              className={cn('far',
                selectedTodo?.id === id ? 'fa-eye-slash' : 'fa-eye')}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
