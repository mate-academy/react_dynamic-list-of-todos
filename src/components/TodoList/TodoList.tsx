import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  handleSelect: (todo: Todo | null) => void;
  handleModalClose: () => void;
  selectedTodoId: number | null;
  setSelectedTodoId: (id: number | null) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  handleSelect,
  handleModalClose,
  selectedTodoId,
  setSelectedTodoId,
}) => {
  const toggleSelect = (todo: Todo) => {
    if (selectedTodoId === todo.id) {
      handleModalClose();
      setSelectedTodoId(null);
    } else {
      handleSelect(todo);
      setSelectedTodoId(todo.id);
    }
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
          <tr
            key={todo.id}
            data-cy="todo"
            className={
              selectedTodoId === todo.id ? 'has-background-info-light' : ''
            }
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
              <p
                className={`has-text-${todo.completed ? 'success' : 'danger'}`}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => toggleSelect(todo)}
              >
                <span className="icon">
                  <i
                    className={`far ${
                      selectedTodoId === todo.id ? 'fa-eye-slash' : 'fa-eye'
                    }`}
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
