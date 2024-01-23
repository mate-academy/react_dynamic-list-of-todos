import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  setSelectedTodo: (value: Todo) => void;
  selectedTodo: Todo | null;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  setSelectedTodo,
  selectedTodo,
}) => {
  const isSlashIcon = () => {
    return selectedTodo?.id === todo.id;
  };

  const { id, title, completed } = todo;

  return (
    <tr data-cy="todo" className="">
      <td className="is-vcentered">{id}</td>
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
            setSelectedTodo(todo);
          }}
        >
          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye': !isSlashIcon(),
                'fa-eye-slash': isSlashIcon(),
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
