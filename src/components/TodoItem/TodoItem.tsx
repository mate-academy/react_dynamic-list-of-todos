import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todo: Todo;
  selected: Todo | '';
  onSelect: (todo: Todo | '') => void;
};

export const TodoItem: React.FC<Props> = ({ todo, selected, onSelect }) => {
  const { completed, id, title } = todo;
  const handleSelect = (todoItem: Todo) => () => {
    onSelect(todoItem);
  };

  return (
    <tr data-cy="todo" key={id}>
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
          className={classNames({
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
          onClick={handleSelect(todo)}
        >
          <span className="icon">
            {selected && selected.id === id && (
              <i className="far fa-eye-slash" />
            )}

            {selected && typeof selected !== 'string' && selected.id !== id && (
              <i className="far fa-eye" />
            )}

            {!selected && <i className="far fa-eye" />}
          </span>
        </button>
      </td>
    </tr>
  );
};
