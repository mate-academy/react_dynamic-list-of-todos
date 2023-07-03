import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  selectedTodo: Todo | null,
  handleSelected: (todo: Todo | null) => void,
};

export const TodoInfo: React.FC<Props> = ({
  todo,
  selectedTodo,
  handleSelected,
}) => {
  return (
    <tr
      data-cy="todo"
      className={cn({
        'has-background-info-light': selectedTodo?.id === todo.id,
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
        <p className={cn({
          'has-text-danger': !todo.completed,
          'has-text-success': todo.completed,
        })}
        >
          {todo.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        {selectedTodo?.id === todo.id
          ? (
            <button
              data-cy="selectButton"
              className="button"
              type="button"
              onClick={() => handleSelected(null)}
            >
              <span className="icon">
                <i className="far fa-eye-slash" />
              </span>
            </button>
          )
          : (
            <button
              data-cy="selectButton"
              className="button"
              type="button"
              onClick={() => handleSelected(todo)}
            >
              <span className="icon">
                <i className="far fa-eye" />
              </span>
            </button>
          )}
      </td>
    </tr>
  );
};
