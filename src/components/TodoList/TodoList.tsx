import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedTodoId: number | null;
  onSelectTodo: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  onSelectTodo,
}) => {
  return (
    <table className="table is-fullwidth is-striped is-hoverable is-narrow">
      <tbody>
        {todos.map(todo => {
          const isSelected = selectedTodoId === todo.id;

          return (
            <tr key={todo.id} data-cy="todo">
              <td>{todo.id}</td>

              <td>
                {todo.completed && (
                  <span
                    data-cy="iconCompleted"
                    className="icon has-text-success"
                  >
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>

              <td>{todo.title}</td>

              <td className="has-text-right">
                <button
                  type="button"
                  data-cy="selectButton"
                  className="button"
                  onClick={() => onSelectTodo(todo)}
                >
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-eye': !isSelected,
                        'fa-eye-slash': isSelected,
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
