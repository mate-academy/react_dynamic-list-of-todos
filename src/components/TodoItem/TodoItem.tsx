import classNames from 'classnames';
import { Todo } from '../../types/Todo';

export interface TodoItemProps {
  selected: Todo | null;
  onSelected: (todo: Todo | null) => void;
  toDo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  selected,
  onSelected,
  toDo,
}) => {
  const { id, title, completed } = toDo;

  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': id === selected?.id,
      })}
    >
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check"></i>
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p
          className={classNames(
            { 'has-text-success': completed },
            { 'has-text-danger': !completed },
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
          onClick={() => onSelected(toDo)}
        >
          <span className="icon">
            {id === selected?.id ? (
              <i className="far fa-eye-slash" />
            ) : (
              <i className="far fa-eye" />
            )}
          </span>
        </button>
      </td>
    </tr>
  );
};
