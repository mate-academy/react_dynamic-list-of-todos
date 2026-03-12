import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  selectedId: number | null;
  onClick: (todo: Todo) => void;
};

export const TodoRecord: React.FC<Props> = ({ todo, selectedId, onClick }) => {
  return (
    <tr data-cy="todo" className="">
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {todo.completed ? (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        ) : (
          ''
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
          onClick={() => onClick(todo)}
        >
          <span className="icon">
            <i
              className={`far ${todo.id === selectedId ? 'fa-eye-slash' : 'fa-eye'}`}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
