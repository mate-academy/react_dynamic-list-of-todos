import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todo: Todo;
  onSelect: (todo: Todo) => void;
};

export const TodoItem: React.FC<Props> = ({ todo, onSelect }) => {
  return (
    <tr data-cy="todo">
      <td className="is-vcentered">{todo.id}</td>

      <td className="is-vcentered" />

      <td
        className={classNames('is-vcentered', {
          'is-expanded': todo.completed,
        })}
      >
        <p
          className={classNames({
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
          onClick={() => onSelect(todo)}
        >
          <span className="icon">
            <i className="far fa-eye" />
          </span>
        </button>
      </td>
    </tr>
  );
};
