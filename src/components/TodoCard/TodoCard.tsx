import { Todo } from '../../types/Todo';

type TodoCardProps = {
  todo: Todo;
  onTodoSelect: (todo: Todo) => void;
  todoSelected: Todo | null;
};

export const TodoCard = ({
  todo,
  onTodoSelect,
  todoSelected,
}: TodoCardProps) => {
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
          onClick={() => {
            onTodoSelect(todo);
          }}
        >
          <span className="icon">
            <i
              className={`far ${todo === todoSelected ? 'fa-eye-slash' : 'fa-eye'}`}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
