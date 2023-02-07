import classNames from 'classnames';
import React from 'react';

import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  selectedTodo: Todo | null;
  onSelect: (todo: Todo) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodo,
  onSelect,
}) => (
  <table className="table is-narrow is-fullwidth">
    <thead>
      <tr>
        <th>#</th>
        <th>
          <span className="icon">
            <i className="fas fa-check" />
          </span>
        </th>
        <th>Title</th>
        <th> </th>
      </tr>
    </thead>

    <tbody>
      {todos.map(({
        id,
        title,
        completed,
        userId,
      }) => {
        return (
          <tr data-cy="todo" className="" key={id}>
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
                onClick={() => onSelect({
                  id,
                  title,
                  completed,
                  userId,
                })}
              >
                <span className="icon">
                  <i className={classNames('far', {
                    'fa-eye': id !== selectedTodo?.id,
                    'fa-eye-slash': id === selectedTodo?.id,
                  })}
                  />
                </span>
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
