import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setUserId: (
    userId: number,
    title: string,
    complete: boolean,
    taskId: number,
  ) => void;
  handleVisability: (id: number) => void;

  visability: Record<number, boolean>;
};

export const TodoList: React.FC<Props> = ({
  todos,
  setUserId,
  handleVisability,
  visability,
}) => {
  const handle = (
    userId: number,
    title: string,
    complete: boolean,
    id: number,
  ) => {
    handleVisability(id);

    setUserId(userId, title, complete, id);
  };

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
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
      </thead>

      <tbody>
        {todos.map((todo: Todo) => (
          <tr data-cy="todo" className="" key={todo.id}>
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check"></i>
                </span>
              )}
            </td>
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
                onClick={() =>
                  handle(todo.userId, todo.title, todo.completed, todo.id)
                }
              >
                <span className="icon">
                  <i
                    className={`far ${
                      visability[todo.id] || false ? 'fa-eye-slash' : 'fa-eye'
                    }`}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
