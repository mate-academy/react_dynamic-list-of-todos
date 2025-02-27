import { Todo } from '../../types/Todo';

interface Props {
  allTodos: Todo[];
  filter: 'all' | 'active' | 'completed';
  search: string;
  setModalActive: (value: boolean) => void;
  setSelectedTodo: (value: Todo) => void;
  selectedTodo: Todo;
}

export const TodoList = ({
  allTodos,
  filter,
  search,
  setModalActive,
  setSelectedTodo,
  selectedTodo,
}: Props) => {
  let processedTodos = [...allTodos];

  switch (filter) {
    case 'all':
      break;

    case 'active':
      processedTodos = processedTodos.filter(todo => todo.completed === false);
      break;

    case 'completed':
      processedTodos = processedTodos.filter(todo => todo.completed === true);
      break;
  }

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
        {processedTodos
          .filter(todo => todo.title.toLowerCase().includes(search))
          .map((todo: Todo) => (
            <tr key={todo.id} data-cy="todo" className="">
              <td className="is-vcentered">{todo.id}</td>
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
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => {
                    setModalActive(true);
                    setSelectedTodo(todo);
                  }}
                >
                  {todo.id === selectedTodo.id ? (
                    <span className="icon">
                      <i className="far fa-eye-slash" />
                    </span>
                  ) : (
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  )}
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
