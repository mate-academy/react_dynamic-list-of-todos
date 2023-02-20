import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo
  onSelect: (todo: Todo) => void;
  selected: number | undefined;
};

export const TodoInfo: React.FC<Props> = ({ todo, onSelect, selected }) => {
  const { id, completed, title } = todo;

  return (
    <tr data-cy="todo" className="">
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {completed
        && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p className={completed
          ? 'has-text-success'
          : 'has-text-danger'}
        >
          {title}
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
            <i className={classNames(
              'far', id === selected
                ? 'fa-eye-slash'
                : 'fa-eye',
            )}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
