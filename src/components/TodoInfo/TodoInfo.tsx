import { MouseEvent } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  selectedTodo: Todo | null;
  onTodoSelect: (event: MouseEvent<HTMLButtonElement>, todo: Todo) => void;
};

export const TodoInfo: React.FC<Props> = ({
  todo,
  selectedTodo,
  onTodoSelect,
}) => {
  const { id, title, completed } = todo;
  const selected = selectedTodo?.id === id;

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
          onClick={event => onTodoSelect(event, todo)}
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
