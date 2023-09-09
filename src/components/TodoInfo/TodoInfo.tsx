import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type TodoInfoProps = {
  todo: Todo
  onClick: (todoId: number) => void
  detailsButtonClassNames: string
};

export const TodoInfo = (
  {
    todo: {
      id,
      title,
      completed,
    },
    onClick,
    detailsButtonClassNames,
  }: TodoInfoProps,
) => {
  const todoStatusClass = classNames(`has-text-${completed ? 'success' : 'danger'}`);

  return (
    <tr data-cy="todo">
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p
          className={todoStatusClass}
        >
          {title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => onClick(id)}
        >
          <span className="icon">
            <i className={detailsButtonClassNames} />
          </span>
        </button>
      </td>
    </tr>
  );
};
