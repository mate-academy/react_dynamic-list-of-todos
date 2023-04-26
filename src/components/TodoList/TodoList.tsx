import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  currentTodo: Todo | null;
  setCurrentTodo: (todo: Todo | null) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  currentTodo,
  setCurrentTodo,
}) => {
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
        {todos.map((todo) => {
          const { id, completed, title } = todo;

          return (
            <tr data-cy="todo" className="" key={id}>
              <td className="is-vcentered">
                {id}
              </td>
              <td className="is-vcentered">
                {completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p className={completed
                  ? 'has-text-success' : 'has-text-danger'}
                >
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                {currentTodo?.id === id ? (
                  <button
                    data-cy="selectButton"
                    className="button is-link"
                    type="button"
                    onClick={() => {
                      setCurrentTodo(currentTodo);
                    }}
                  >
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  </button>
                ) : (
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => {
                      setCurrentTodo(todo);
                    }}
                  >
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
