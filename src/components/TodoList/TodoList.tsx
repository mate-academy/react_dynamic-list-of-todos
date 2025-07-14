import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  loading: boolean;
  selectedTodoId: number | null;
  onSelect: (user: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  loading,
  selectedTodoId,
  onSelect,
}) => {
  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        {!loading && (
          <tr>
            <th>#</th>
            <th>
              <span className="icon">
                <i className="fas fa-check" />
              </span>
            </th>
            <th>Title</th>
            <th> </th>
          </tr>
        )}
      </thead>

      <tbody>
        {todos.map(todo => (
          <tr data-cy="todo" className="" key={todo.id}>
            <td className="is-vcentered">{todo.id}</td>
            {todo.completed ? (
              <td className="is-vcentered">
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              </td>
            ) : (
              <td className="is-vcentered" />
            )}
            <td className="is-vcentered is-expanded">
              <p
                className={
                  todo.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => onSelect(todo)}
              >
                <span className="icon">
                  {selectedTodoId === todo.id ? (
                    <i className="far fa-eye-slash" data-cy="iconHide" />
                  ) : (
                    <i className="far fa-eye" data-cy="iconShow" />
                  )}
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
