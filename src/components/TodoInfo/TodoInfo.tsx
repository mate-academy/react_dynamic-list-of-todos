import classNames from 'classnames';
import { FC } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  activeId?: number;
  setActiveId: (id:number) => void;
};

export const TodoInfo: FC<Props> = ({
  todo,
  activeId,
  setActiveId,
}) => {
  const {
    completed,
    id,
    title,
  } = todo;

  return (
    <tr
      data-cy="todo"
      className={classNames(
        { 'has-background-info-light': id === activeId },
      )}
      key={id}
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
        <p
          className={classNames(
            'has-text-success',
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
          onClick={() => setActiveId(id)}
        >
          <span className="icon">
            <i className={classNames(
              'far fa-eye',
              { 'fa-eye-slash': id === activeId },
            )}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
