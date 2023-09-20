import cn from 'classnames';
import { Todo } from '../../types/Todo';

type TodoListProps = {
  todos: Todo[];
  setSelectedTodoId: (todoId: number) => void;
  selectedTodoId: number;
};

export const TodoList: React.FC<TodoListProps> = ({
  todos, setSelectedTodoId, selectedTodoId,
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
      {todos?.map(todo => (
        <tr
          data-cy="todo"
          key={todo.id}
          className={cn({
            'has-background-info-light': selectedTodoId === todo.id,
            '': selectedTodoId !== todo.id,
          })}
        >
          <td className="is-vcentered">{todo.id}</td>
          <td className="is-vcentered">
            {todo.completed
                && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
          </td>
          <td className="is-vcentered is-expanded">
            <p className={`has-text-${todo.completed ? 'success' : 'danger'}`}>
              {todo.title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            <button
              data-cy="selectButton"
              className="button"
              type="button"
              title="button"
              onClick={() => setSelectedTodoId(todo.id)}
            >
              <span className="icon">
                <i className={cn({
                  'far fa-eye-slash': selectedTodoId === todo.id,
                  'far fa-eye': selectedTodoId !== todo.id,
                })}
                />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
