import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  setSelectedTodo: (selectedTodo: Todo) => void,
  setSelectedTodoId: (todoId: number) => void,
  selectedTodoId: number,
};

export const TodoList: React.FC<Props> = ({
  todos,
  setSelectedTodo,
  setSelectedTodoId,
  selectedTodoId,
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
        {todos.map(todo => (
          <tr
            data-cy="todo"
            className={classNames(
              { 'has-background-info-light': selectedTodoId === todo.id },
            )}
            key={todo.id}
          >
            <td className="is-vcentered">{todo.id}</td>
            {todo.completed ? (
              <td className="is-vcentered">
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              </td>
            ) : (<td className="is-vcentered" />)}
            <td className="is-vcentered is-expanded">
              <p
                className={classNames(
                  'has-text-success',
                  { 'has-text-danger': !todo.completed },
                )}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              {selectedTodoId === todo.id ? (
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => {
                    setSelectedTodoId(0);
                  }}
                >
                  <span className="icon">
                    <i className="far fa-eye-slash" />
                  </span>
                </button>
              ) : (
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => {
                    setSelectedTodo(todo);
                    setSelectedTodoId(todo.id);
                  }}
                >
                  <span className="icon">
                    <i className="far fa-eye" />
                  </span>
                </button>
              )}

            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
