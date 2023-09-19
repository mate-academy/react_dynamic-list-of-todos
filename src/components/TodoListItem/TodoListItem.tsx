import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  selectedTodo: Todo | null;
  onSelect: (todo: Todo) => void;
}

export const TodoListItem: React.FC<Props> = ({
  todo,
  onSelect,
  selectedTodo,
}) => {
  const { id, title, completed } = todo;

  return (
    <tr data-cy="todo">
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
          className={classNames({
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
            <i
              className={classNames({
                'far fa-eye-slash': selectedTodo?.id === todo.id,
                'far fa-eye': selectedTodo?.id !== todo.id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
