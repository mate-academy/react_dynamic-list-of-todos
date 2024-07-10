import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

interface Props {
  activeTodoId?: number;
  todos: Todo[];
  onClick: (todo: Todo) => void;
}

export const TodoList: React.FC<Props> = ({ activeTodoId, todos, onClick }) => (
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
      {todos.map(todo => {
        const { id, title, completed } = todo;
        const isActive = id === activeTodoId;

        return (
          <tr
            key={id}
            data-cy="todo"
            className={cn({
              'has-background-info-light': isActive,
            })}
          >
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
                className={cn({
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
                onClick={() => onClick(todo)}
              >
                <span className="icon">
                  <i
                    className={cn('far', {
                      'fa-eye-slash': isActive,
                      'far fa-eye': !isActive,
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
