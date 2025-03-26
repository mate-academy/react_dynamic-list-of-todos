import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  selectedId: number | null;
  setSelectedId: (id: number) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  selectedId,
  setSelectedId,
}) => {
  return (
    <tr data-cy="todo" className="has-background-info-light">
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
          onClick={() => setSelectedId(todo.id)}
        >
          <span className="icon">
            <i
              className={
                selectedId === todo.id ? 'far fa-eye-slash' : 'far fa-eye'
              }
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
