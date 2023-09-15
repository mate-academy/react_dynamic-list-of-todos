import classnames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  selectedTodo: Todo | null;
  onSelectTodo: (todo: Todo) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  selectedTodo,
  onSelectTodo,
}) => {
  const isSelected = selectedTodo === todo;

  return (
    <tr
      key={todo.id}
      data-cy="todo"
      className={classnames({
        'has-background-info-light': isSelected,
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
        <p className={classnames({
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
          onClick={() => onSelectTodo(todo)}
        >
          <span className="icon">
            <i className={classnames(
              'far',
              {
                'fa-eye': !isSelected,
                'fa-eye-slash': isSelected,
              },
            )}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
