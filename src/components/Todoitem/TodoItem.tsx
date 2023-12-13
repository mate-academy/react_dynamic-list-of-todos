import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onSelectTodo: (todo: Todo) => void;
  todoSelected: Todo | null;
};

// eslint-disable-next-line max-len
export const TodoItem: React.FC<Props> = ({ todos, onSelectTodo, todoSelected }) => {
  return (
    <>
      {todos.map((todo) => (
        <tr data-cy="todo" className="">
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
              onClick={() => onSelectTodo(todo)}
            >
              <span className="icon">
                <i
                  className={
                    todoSelected?.id !== todo.id
                      ? 'far fa-eye'
                      : 'far fa-eye-slash'
                  }
                />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};
