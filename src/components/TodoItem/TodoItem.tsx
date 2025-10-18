import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import React from 'react';

type Props = {
  todo: Todo;
  onOpen: (userId: number, todoId: number) => void;
  isSelected: boolean;
};

export const TodoItem: React.FC<Props> = ({ todo, onOpen, isSelected }) => {
  return (
    <tr data-cy="todo" className="">
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check"></i>
          </span>
        )}
      </td>
      <td
        className={classNames('is-vcentered', {
          'is-expanded': !todo.completed,
        })}
      >
        <p
          className={classNames({
            'has-text-danger': !todo.completed,
            'has-text-success': todo.completed,
          })}
        >
          {todo.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => onOpen(todo.userId, todo.id)}
        >
          <span className="icon">
            <i
              className={classNames('far', {
                'fa-eye-slash': isSelected,
                'fa-eye': !isSelected,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};

// fa-eye-slash
// "far fa-eye"
