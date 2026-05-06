import { Todo } from '../../types/Todo';

export const TodoList: React.FC<{
  todos: Todo[];
  onTodoSelect: (todo: Todo) => void;
  selectedTodo: Todo | null;
}> = ({ todos, onTodoSelect, selectedTodo }) => (
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
        <tr key={todo.id} data-cy="todo">
          <td data-cy="todo-id">{todo.id}</td>

          <td>
            {todo.completed && (
              <span data-cy="iconCompleted" className="icon has-text-success">
                <i className="fas fa-check" />
              </span>
            )}
          </td>

          <td data-cy="todo-title">{todo.title}</td>

          <td className="has-text-right">
            <button
              type="button"
              className="button is-small"
              data-cy="selectButton"
              onClick={() => onTodoSelect(todo)}
            >
              <i
                className={`fas ${
                  selectedTodo?.id === todo.id ? 'fa-eye-slash' : 'fa-eye'
                }`}
              />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
