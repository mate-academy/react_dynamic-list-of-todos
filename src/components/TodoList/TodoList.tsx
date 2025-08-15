import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedTodoId: number | null;
  onShowModal: (value: boolean) => void;
  onGetTodo: (value: Todo) => void;
  onChangeTodoId: (value: number | null) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  onShowModal,
  onGetTodo,
  onChangeTodoId,
}) => {
  const handleShowModal = (todo: Todo) => {
    onGetTodo(todo);
    onShowModal(true);
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
        {todos.map(todo => {
          return (
            <tr
              data-cy="todo"
              key={todo.id}
              className={classNames({
                'has-background-info-light': selectedTodoId === todo.id,
              })}
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
                    handleShowModal(todo);
                    onChangeTodoId(todo.id);
                  }}
                >
                  <span className="icon">
                    <i
                      className={`far ${selectedTodoId !== todo.id ? 'fa-eye' : 'fa-eye-slash'} `}
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
