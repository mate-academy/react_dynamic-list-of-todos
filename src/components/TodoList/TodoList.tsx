import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  activeTodo: Todo | null;
  onSelectTodo: (val: Todo) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  activeTodo,
  onSelectTodo,
}) => {
  const handleSelectTodo = (todo: Todo) => {
    onSelectTodo(todo);
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
          <th />
        </tr>
      </thead>

      <tbody>
        {todos.map(todo => {
          const isActive = todo.id === activeTodo?.id;
          const selectIconClass = `far ${isActive ? 'fa-eye-slash' : 'fa-eye'}`;
          const statusTextClass = todo.completed
          ? 'has-text-success'
          : 'has-text-danger';

        return (
          <tr
            data-cy="todo"
            className={isActive ? 'has-background-info-light' : ''}
            key={todo.id}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p className={statusTextClass}>{todo.title}</p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => handleSelectTodo(todo)}
              >
                <span className="icon">
                  <i className={selectIconClass} />
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
