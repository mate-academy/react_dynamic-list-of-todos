import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todo: Todo;
  selectedTodo?: Todo | null;
  onSelect?: (todo: Todo) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onSelect = () => {},
  selectedTodo,
}) => {
  const { id, title, completed } = todo;

  return (
    <tr
      key={id}
      data-cy="todo"
      className={classNames('', {
        'has-background-info-light': selectedTodo?.id === id,
      })}
    >
      <td className="is-vcentered">{id}</td>
      {completed ? (
        <td className="is-vcentered">
          <i className="fas fa-check" data-cy="iconCompleted" />
        </td>
      ) : (
        <td className="is-vcentered" />
      )}
      <td className="is-vcentered is-expanded">
        <p
          className={classNames('has-text-success', {
            'has-text-danger': !completed,
          })}
        >
          {title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          onClick={() => onSelect(todo)}
          type="button"
        >
          <span className="icon">
            <i
              className={classNames('far', {
                'fa-eye-slash': selectedTodo?.id === id,
                'far fa-eye': selectedTodo?.id !== id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
