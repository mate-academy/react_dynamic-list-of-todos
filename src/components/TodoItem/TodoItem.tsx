import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todo: Todo;
  setSelectedTodo: (todo: Todo) => void;
  selectedTodo: Todo | null;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  setSelectedTodo,
  selectedTodo,
}) => {
  const ID_COMPARISON = todo.id === selectedTodo?.id;

  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': ID_COMPARISON,
      })}
      key={todo.id}
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
          className={classNames(
            { 'has-text-success': todo.completed },
            { 'has-text-danger': !todo.completed },
          )}
        >
          {todo.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => setSelectedTodo(todo)}
        >
          <span className="icon">
            <i
              className={classNames(
                'far',
                ID_COMPARISON ? 'fa-eye-slash' : 'fa-eye',
              )}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
