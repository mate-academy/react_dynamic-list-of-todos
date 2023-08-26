// eslint-disable-next-line
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo
};

export const ToDoItem: React.FC<Props> = ({ todo }) => {
  return (
    <tr data-cy="todo" className="">
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered" />
      <td className="is-vcentered is-expanded">
        <p className={classNames({
          'has-text-success': todo.completed === true,
          'has-text-danger': todo.completed === false,
        })}
        >
          {todo.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button data-cy="selectButton" className="button" type="button">
          <span className="icon">
            <i className="far fa-eye" />
          </span>
        </button>
      </td>
    </tr>
  );
};
