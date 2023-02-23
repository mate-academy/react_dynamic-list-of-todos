import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  handleTodoSelect: (todo: Todo) => void
  selectedTodo: Todo | null,
};

export const TodoInfo: React.FC<Props> = ({
  todo,
  handleTodoSelect,
  selectedTodo,
}) => {
  const {
    id,
    title,
    completed,
  } = todo;

  return (

    <tr data-cy="todo" className="" key={id}>
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p
          className={classNames(
            completed ? 'has-text-success' : 'has-text-danger',
          )}
        >
          {title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => (
            handleTodoSelect(todo)
          )}
        >
          <span className="icon">
            {selectedTodo?.id !== todo.id ? (
              <i className="far fa-eye" />
            ) : (
              <i className="far fa-eye-slash" />

            )}
          </span>
        </button>
      </td>
    </tr>
  );
};
