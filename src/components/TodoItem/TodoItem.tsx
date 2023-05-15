import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type TodoItemProps = {
  todo: Todo;
  isTodoModalOpen: boolean;
  onOpenModal: (selectedTodo: Todo) => void;
};

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  isTodoModalOpen,
  onOpenModal,
}) => (
  <tr
    data-cy="todo"
    className={classNames({
      'has-background-info-light': isTodoModalOpen,
    })}
  >
    <td className="is-vcentered">{todo.id}</td>

    <td className="is-vcentered">
      {
        todo.completed && (
          <span
            className="icon"
            data-cy="iconCompleted"
          >
            <i className="fas fa-check" />
          </span>
        )
      }
    </td>

    <td className="is-vcentered is-expanded">
      <p
        className={classNames('block', {
          'has-text-success': todo.completed,
          'has-text-danger': !todo.completed,
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
        onClick={() => onOpenModal(todo)}
      >
        <span className="icon">
          <i className={classNames('far', {
            'fa-eye': !isTodoModalOpen,
            'fa-eye-slash': isTodoModalOpen,
          })}
          />
        </span>
      </button>
    </td>
  </tr>
);
