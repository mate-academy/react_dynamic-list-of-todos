import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedTodo: Todo | null;
  onSelectedTodo: (todo: Todo | null) => void;
};

export const TodoComponent: React.FC<Props> = ({
  todos,
  selectedTodo,
  onSelectedTodo,
}) => {
  return (
    <tbody>
      {todos.map(todo => (
        <tr data-cy="todo" className="" key={todo.id}>
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
              onClick={() => onSelectedTodo(todo)}
            >
              <span className="icon">
                <i
                  className={classNames(
                    selectedTodo?.id === todo.id
                      ? 'far fa-eye-slash'
                      : 'far fa-eye',
                  )}
                />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
