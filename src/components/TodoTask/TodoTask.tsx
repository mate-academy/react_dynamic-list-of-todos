import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  onToggleModal: (
    userId: number,
    todoId: number,
    status: boolean,
  ) => void,
  selectedTodo: Todo | null,
};

export const TodoTask: React.FC<Props> = ({
  todo,
  onToggleModal,
  selectedTodo,
}) => {
  return (
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
        <p className={classNames({
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
          onClick={() => onToggleModal(todo.userId, todo.id, true)}
        >
          <span className="icon">
            <i className={classNames('far', {
              'fa-eye': selectedTodo?.id !== todo.id,
              'fa-eye-slash': selectedTodo?.id === todo.id,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
