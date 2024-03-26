import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  setActiveTodo: (el: Todo) => void;
  activeTodo: Todo | null;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  setActiveTodo,
  activeTodo,
}) => {
  const handleActiveTodo = (newActiveTodo: Todo) => {
    setActiveTodo(newActiveTodo);
  };

  const { id, completed, title } = todo;

  return (
    <tr data-cy="todo" className="" key={id}>
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p className={'has-text-' + (completed ? 'success' : 'danger')}>
          {title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => handleActiveTodo(todo)}
        >
          <span className="icon">
            {activeTodo?.id === id ? (
              <i className="far fa-eye-slash" />
            ) : (
              <i className="far fa-eye" />
            )}
          </span>
        </button>
      </td>
    </tr>
  );
};
