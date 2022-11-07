import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[],
  selectedTodoId: number,
  setSelectedTodoId: (todoId: number) => void,
  setIsLoadedUser: (value: boolean) => void,
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  setSelectedTodoId,
  setIsLoadedUser,
}) => {
  const selectTodoHandler = (todoId: number) => {
    setSelectedTodoId(todoId);
    setIsLoadedUser(false);
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
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {todos.map(({ id, title, completed }) => (
          <tr
            key={id}
            data-cy="todo"
            className={cn({
              'has-background-info-light': id === selectedTodoId,
            })}
          >
            <td className="is-vcentered">
              {id}
            </td>

            <td className="is-vcentered">
              {completed && (
                <span
                  className="icon"
                  data-cy="iconCompleted"
                >
                  <i className="fas fa-check" />
                </span>
              )}
            </td>

            <td className="is-vcentered is-expanded">
              <p
                className={cn({
                  'has-text-danger': !completed,
                  'has-text-success': completed,
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
                onClick={() => selectTodoHandler(id)}
              >
                <span className="icon">
                  <i
                    className={cn(
                      'far',
                      { 'fa-eye': selectedTodoId !== id },
                      { 'fa-eye-slash': selectedTodoId === id },
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
};
