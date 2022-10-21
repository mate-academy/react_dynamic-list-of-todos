import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  selectedTodo: Todo;
  selectTodo: (todo: Todo) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  selectTodo,
  selectedTodo,
}) => {
  const { id, completed, title } = todo;

  return (
    <tr data-cy="todo" className="" >
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
          className={classNames(
            '',
            {
              'has-text-success': completed,
              'has-text-danger': !completed,
            },
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
            selectTodo(todo);
          }}
        >
          <span className="icon">
            <i className={classNames(
              'far',
              {
                'fa-eye-slash': selectedTodo.id === id,
                'fa-eye': selectedTodo.id !== id,
              },
            )}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
