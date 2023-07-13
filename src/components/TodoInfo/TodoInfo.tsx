import { MouseEvent } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  selectedTodoId: number;
  onTodoSelect: (event: MouseEvent<HTMLButtonElement>, todoId: number) => void;
};

export const TodoInfo: React.FC<Props> = ({
  todo,
  selectedTodoId,
  onTodoSelect,
}) => {
  const { id, title, completed } = todo;
  const selected = selectedTodoId === id;

  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': selected,
      })}
    >
      <td className="is-vcentered">{id}</td>
      {completed ? (
        <td className="is-vcentered">
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        </td>
      ) : (
        <td className="is-vcentered" />
      )}
      <td className="is-vcentered is-expanded">
        <p className={classNames({
          'has-text-danger': !completed,
          'has-text-success': completed,
        })}
        >
          {title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={event => onTodoSelect(event, id)}
        >
          <span className="icon">
            <i className={classNames({
              'far fa-eye': !selected,
              'far fa-eye-slash': selected,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
