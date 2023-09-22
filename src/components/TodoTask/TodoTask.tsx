import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  activeTodoId?: number | null,
  onSetActiveTodo: (activeId: number) => void
};

export const TodoTask: React.FC<Props> = ({
  todo,
  activeTodoId,
  onSetActiveTodo,
}) => {
  const {
    id,
    completed,
    title,
  } = todo;

  const isTodoActive = activeTodoId === id;

  return (
    <tr
      data-cy="todo"
      // has-background-info-light
      className={classNames({
        'has-background-info-light': isTodoActive,
      })}
    >
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
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
          onClick={() => onSetActiveTodo(id)}
        >
          <span className="icon">
            <i
              className={classNames({
                'far fa-eye': !isTodoActive,
                'far fa-eye-slash': isTodoActive,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
