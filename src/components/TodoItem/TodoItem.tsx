import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => (
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
        className={classNames(
          {
            'has-text-danger': !todo.completed,
            'has-text-success': todo.completed,
          },
        )}
      >
        {todo.title}
      </p>
    </td>
    <td className="has-text-right is-vcentered">
      <button
        data-cy="selectButton"
        className="button"
        type="button"
      >
        <span className="icon">
          <i className="far fa-eye" />
        </span>
      </button>
    </td>
  </tr>
);
