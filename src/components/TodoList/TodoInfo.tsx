import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  choosenId: number | null;
  handleChooseTodoEye: (todo: Todo) => void;
}

export const TodoInfo: React.FC<Props> = ({
  todo, choosenId, handleChooseTodoEye,
}) => {
  const { id, completed, title } = todo;
  const isChoosen = (id === choosenId);

  return (
    <tr
      data-cy="todo"
      className={classNames({ 'has-background-info-light': isChoosen })}
      key={id}
    >
      <td className="is-vcentered">{id}</td>

      {completed
        ? (
          <td className="is-vcentered">
            <span className="icon" data-cy="iconCompleted">
              <i className="fas fa-check" />
            </span>
          </td>
        )
        : <td className="is-vcentered" />}

      <td className="is-vcentered is-expanded">
        <p
          className={`has-text-${completed ? 'success' : 'danger'}`}
        >
          {title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => handleChooseTodoEye(todo)}
        >
          <span className="icon">
            <i
              className={`far ${isChoosen ? 'fa-eye-slash' : 'fa-eye'}`}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
