import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  activeTodo: Todo | null;
  onSelect: (todo:Todo) => void;
}

export const TodoComponent: React.FC<Props> = ({
  todo,
  activeTodo,
  onSelect,
}) => {
  const {
    id,
    title,
    completed,
  } = todo;
  return (
    <tr
      key={id}
      data-cy="todo"
      className={classNames({
        'has-background-info-light': activeTodo,
      })}
    >
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered" />
      <td className="is-vcentered is-expanded">
        <p
          className={classNames({
            'has-text-success': completed,
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
          type="button"
          onClick={() => onSelect(todo)}
        >
          <span className="icon">
            <i className={classNames('far', {
              'fa-eye': activeTodo?.id !== id,
              'fa-eye-slash': activeTodo?.id === id,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};