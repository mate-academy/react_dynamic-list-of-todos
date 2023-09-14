import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  setSelectedTodo: (u: Todo) => void,
  selectedTodo: Todo | null,
};

export const TodoList: React.FC<Props> = (
  {
    todos, setSelectedTodo, selectedTodo,
  },
) => {
  const onSelectHandler = (todo: Todo) => {
    setSelectedTodo(todo);
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
        {todos.map(todo => (
          <tr data-cy="todo" className="" key={todo.id}>
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
              <p
                className={classNames(
                  { 'has-text-success': todo.completed },
                  { 'has-text-danger': !todo.completed },
                )}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => onSelectHandler(todo)}
              >
                <span className="icon">
                  <i className={classNames(
                    'far',
                    { 'fa-eye-slash': selectedTodo === todo },
                    { 'fa-eye': !(selectedTodo === todo) },
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
