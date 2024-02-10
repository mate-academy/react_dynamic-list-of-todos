import cn from 'classnames';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC<{
  resultTodos: Todo[],
  handleShowUser: (filteredTodos: Todo) => void, isLook: number,
  setIsLook: (boolean: number) => void
}> = ({
  resultTodos,
  handleShowUser,
  isLook,
  setIsLook,
}) => ((
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
      {resultTodos.map((todo: Todo) => (
        <tr
          data-cy="todo"
          className=""
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
            <p className={cn({
              'has-text-danger': !todo.completed,
              'has-text-success': todo.completed,
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
                handleShowUser(todo);
                setIsLook(todo.id);
              }}
            >
              <span className="icon">
                <i className={cn('fa', {
                  'fa-eye': isLook !== todo.id,
                  'fa-eye-slash': isLook === todo.id,
                })}
                />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
));
