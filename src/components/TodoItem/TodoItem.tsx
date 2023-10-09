import React from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  todoInfo: Todo | null;
  selectTodo: (todo: Todo) => void;
};

export const TodoItem: React.FC<Props> = ({ todo, todoInfo, selectTodo }) => {
  // has-background-info-ligh

  return (
    <tr data-cy="todo" className="">
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
          onClick={() => selectTodo(todo)}
        >
          <span className="icon">
            <i className={classNames({
              'far fa-eye': todoInfo?.id !== todo.id,
              'far fa-eye-slash': todoInfo?.id === todo.id,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
