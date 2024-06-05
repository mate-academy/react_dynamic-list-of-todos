import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  filteredTodos: Todo[];
  setTodo: (todo: Todo) => void;
  selectedTodo?: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  filteredTodos,
  setTodo,
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
        {filteredTodos.map(todo => (
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
                className={cn({
                  'has-text-danger': todo.completed === false,
                  'has-text-success': todo.completed === true,
                })}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  setTodo(todo);
                }}
              >
                <span className="icon">
                  <i
                    className={cn('far', {
                      'fa-eye-slash': selectedTodo?.id === todo.id,
                      'fa-eye': selectedTodo?.id !== todo.id,
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
};
