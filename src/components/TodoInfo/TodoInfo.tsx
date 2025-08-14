import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  openModal: (arg: Todo) => void;
  isCurrent: boolean | null;
}

export const TodoInfo: React.FC<Props> = ({ todo, isCurrent, openModal }) => {
  return (
    <tr data-cy="todo" className="has-background-info-light" key={todo.id}>
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
          className={`${todo.completed ? 'has-text-success' : 'has-text-danger'}`}
        >
          {todo.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => openModal(todo)}
        >
          {isCurrent ? (
            <span className="icon">
              <i className="far fa-eye-slash" />
            </span>
          ) : (
            <span className="icon">
              <i className="far fa-eye" />
            </span>
          )}
        </button>
      </td>
    </tr>
  );
};
