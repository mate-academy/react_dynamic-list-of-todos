import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo [];
  onSelectedTodo?: (todo: Todo) => void;
  selectedTodo: Todo | undefined;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onSelectedTodo = () => {},
  selectedTodo,

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
        {todos.map(todo => {
          const { id, title, completed } = todo;
          const isSelectedTodo = selectedTodo?.id === id;

          return (
            <tr
              data-cy="todo"
              className={isSelectedTodo
                ? 'has-background-info-light'
                : ''}
              key={id}
            >
              <td className="is-vcentered">{id}</td>
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
                  className={completed
                    ? 'has-text-success' : 'has-text-danger'}
                >
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => onSelectedTodo(todo)}
                >
                  <span className="icon">
                    <i className={isSelectedTodo
                      ? 'far fa-eye-slash'
                      : 'far fa-eye'}
                    />
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
