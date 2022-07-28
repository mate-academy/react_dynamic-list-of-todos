import classNames from 'classnames';

type Props = {
  todos: Todo[];
  onSelectedTodo: (todo: Todo | null) => void;
  selectedTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onSelectedTodo,
  selectedTodo,
}) => (
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
      {todos.map(todo => (
        <tr
          key={todo.id}
          data-cy="todo"
          className={classNames(
            { 'has-background-info-light': selectedTodo?.id === todo.id },
          )}
        >
          <td className="is-vcentered">{todo.id}</td>
          <td className="is-vcentered">
            <span
              className="icon"
              data-cy={todo.completed && 'iconCompleted'}
            >
              <i className={classNames(
                'fa-regular',
                {
                  'fa-circle-check': todo.completed,
                  'has-text-success': todo.completed,
                  'fa-circle-xmark': !todo.completed,
                  'has-text-danger': !todo.completed,
                },
              )}
              />
            </span>
          </td>
          <td className="is-vcentered is-expanded">
            <p
              className={classNames(
                {
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
                },
              )}
            >
              {todo.title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            <button
              data-cy="selectButton"
              className="button"
              type="button"
              onClick={
                () => {
                  if (selectedTodo?.id === todo.id) {
                    onSelectedTodo(null);
                  } else {
                    onSelectedTodo(todo);
                  }
                }
              }
            >
              <span className="icon">
                <i className={classNames(
                  'far',
                  {
                    'fa-eye-slash': selectedTodo?.id === todo.id,
                    'fa-eye': selectedTodo?.id !== todo.id,
                  },
                )}
                />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
