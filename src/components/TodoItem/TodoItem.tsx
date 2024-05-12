import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todo: Todo;
  setCurrentModal: React.Dispatch<Todo>;
  currentModal: Todo;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  setCurrentModal,
  currentModal,
}) => {
  return (
    <tr data-cy="todo" key={todo.id}>
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
          className={classNames({
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
          onClick={() => setCurrentModal(todo)}
        >
          <span className="icon">
            <i
              className={classNames({
                'far fa-eye-slash': currentModal.id === todo.id,
                'far fa-eye': currentModal.id !== todo.id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
