import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

interface Props {
  todo: Todo;
  isSelected: boolean;
  onSelect: (todo: Todo) => void;
}

export const TodoItem: React.FC<Props> = ({ todo, isSelected, onSelect }) => {
  const handleSelect = () => {
    onSelect(todo);
  };

  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': isSelected,
      })}
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
        <p className={todo.completed ? 'has-text-success' : 'has-text-danger'}>
          {todo.title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={handleSelect}
        >
          <span className="icon">
            <i className={isSelected ? 'far fa-eye-slash' : 'far fa-eye'} />
          </span>
        </button>
      </td>
    </tr>
  );
};
