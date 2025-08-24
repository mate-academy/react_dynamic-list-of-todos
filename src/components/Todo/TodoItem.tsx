import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  onSelectTodo: (todo: Todo) => void;
  selectedTodo: Todo | null;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onSelectTodo,
  selectedTodo,
}) => {
  const isModalOpen = selectedTodo?.id === todo.id;

  return (
    <tr data-cy="todo">
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p className={todo.completed ? 'has-text-success' : 'has-text-danger'}>
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
            <i
              className={classNames('far', {
                'fa-eye-slash': isModalOpen,
                'fa-eye': !isModalOpen,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
