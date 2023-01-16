import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedTodo: number;
  onCLick: (todoId: number) => void;
};

export const TodoList: React.FC<Props> = ({ todos, onCLick, selectedTodo }) => {
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
        {todos.map(({
          id,
          title,
          completed,
        }) => (
          <tr key={id} data-cy="todo" className="">
            <td className="is-vcentered">{id}</td>
            <td className="is-vcentered">
              {completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p className={completed
                ? 'has-text-success'
                : 'has-text-danger'
              }>
                {title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => onCLick(id)}
              >
                <span className="icon">
                  <i className={`far ${selectedTodo === id
                    ? 'fa-eye-slash'
                    : 'fa-eye'}`}
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
