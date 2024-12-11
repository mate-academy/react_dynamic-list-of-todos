import React from 'react';
import { Todo as TodoType } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todo: TodoType;
  handleClick: (todo: TodoType) => void;
};

export const Todo: React.FC<Props> = ({ todo, handleClick }) => {
  return (
    <tr key={todo.id} data-cy="todo">
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
          className={cn({
            'has-text-danger': !todo.completed,
            'has-text-success': todo.completed,
          })}
        >
          {todo.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          onClick={() => handleClick(todo)}
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
};
