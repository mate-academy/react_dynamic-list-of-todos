import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  handleClick: (todo: Todo) => void;
  isSelected: boolean;
}

export const TodoItem: React.FC<Props> = ({
  todo,
  handleClick,
  isSelected,
}) => {
  return (
    <tr
      data-cy="todo"
      className={classNames({ 'has-background-info-light': isSelected })}
      key={todo.id}
    >
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p className={
          classNames({
            'has-text-danger': !todo.completed,
            'has-text-success': todo.completed,
          })
        }
        >
          {todo.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => handleClick(todo)}
        >
          <span className="icon">
            <i className={classNames({
              far: true,
              'fa-eye': !isSelected,
              'fa-eye-slash': isSelected,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
