import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  isSelected: boolean;
  showSelectedTodo: (todo: Todo) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  isSelected,
  showSelectedTodo,
}) => {
  return (
    <tr
      data-cy="todo"
      className={cn({
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
        <p
          className={cn({
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
          onClick={() => showSelectedTodo(todo)}
        >
          <span className="icon">
            <i
              className={cn({
                'far fa-eye-slash': isSelected,
                'far fa-eye': !isSelected,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
