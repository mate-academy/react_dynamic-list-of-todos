import classNames from 'classnames';
import { Todo } from '../../types/Todo';
type Props = {
  todos: Todo[];
  selectedId: number | null;
  onViewTodo: (todo: Todo | null) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedId,
  onViewTodo,
}) => {
  const handleClick = (todo: Todo) => {
    onViewTodo(todo);
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
        {todos &&
          todos.map((todo: Todo) => {
            return (
              <tr key={todo.id} data-cy="todo" className="">
                <td className="is-vcentered">{todo?.id}</td>

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
                    {todo?.title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                  >
                    <span className="icon" onClick={() => handleClick(todo)}>
                      <i
                        className={classNames(
                          'far',
                          todo.id !== selectedId ? 'fa-eye' : 'fa-eye-slash',
                        )}
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
