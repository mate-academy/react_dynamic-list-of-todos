import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo,
  selected?: number,
  onSelect: (todo: Todo) => void,
}

export const TodoItem: React.FC<Props> = ({ todo, selected, onSelect }) => (
  <tr
    key={todo.id}
    data-cy="todo"
    className={classNames({
      'has-background-info-light': selected,
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
      <p className={classNames({
        'has-text-success': todo.completed,
        'has-text-danger': !todo.completed,
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
        onClick={() => {
          onSelect(todo);
        }}
      >
        <span className="icon">
          {selected
            ? <i className="far fa-eye-slash" />
            : <i className="far fa-eye" />}
        </span>
      </button>
    </td>
  </tr>
);
