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
        {filteredTodos.map(todo => {
          const { id, completed, title } = todo;

          return (
            <tr data-cy="todo" className="" key={id}>
              <td className="is-vcentered">{id}</td>
              {completed ? (
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
                    'has-text-danger': completed === false,
                    'has-text-success': completed === true,
                  })}
                >
                  {title}
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
                        'fa-eye-slash': selectedTodo?.id === id,
                        'fa-eye': selectedTodo?.id !== id,
                      })}
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
