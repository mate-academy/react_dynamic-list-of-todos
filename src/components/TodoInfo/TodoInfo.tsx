import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  onCheck: (item: Todo | null) => void;
  checkedTodo: Todo | null;
};

export const TodoInfo: React.FC<Props> = ({ todo, onCheck, checkedTodo }) => {
  return (
    <tr data-cy="todo" className="">
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
          onClick={() => onCheck(todo)}
        >
          <span className="icon">
            <i
              className={`far ${checkedTodo && checkedTodo.id === todo.id ? 'fa-eye-slash' : 'fa-eye'}`}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
