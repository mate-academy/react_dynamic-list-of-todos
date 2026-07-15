import { Todo } from '../../types/Todo';

type TodoListProps = {
  todos: Todo[];
  selectedTodoId: number | null;
  handleSelectTodo: (todo: Todo) => void;
};

export const TodoList = ({
  todos,
  selectedTodoId,
  handleSelectTodo,
}: TodoListProps) => (
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
        const isSelected = selectedTodoId === todo.id;

        return (
          <tr
            key={todo.id}
            data-cy="todo"
            className={isSelected ? 'has-background-info-light' : ''}
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
                onClick={() => handleSelectTodo(todo)}
              >
                <span className="icon">
                  <i
                    className={isSelected ? 'far fa-eye-slash' : 'far fa-eye'}
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
