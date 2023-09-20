import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo
  selectedTodo: Todo | null,
  onSelectedTodo: (todo: Todo) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  selectedTodo,
  onSelectedTodo,
}) => {
  const isSelectedTodo = selectedTodo?.id === todo.id;

  return (
    <tr
      key={todo.id}
      data-cy="todo"
      className={classNames({
        'has-background-info-light': isSelectedTodo,
      })}
    >
      <td className="is-vcentered">
        {todo.id}
      </td>
      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p className={classNames({
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
          onClick={() => onSelectedTodo(todo)}
        >
          <span className="icon">
            <i className={classNames(
              'far',
              {
                'fa-eye': !isSelectedTodo,
                'fa-eye-slash': isSelectedTodo,
              },
            )}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
