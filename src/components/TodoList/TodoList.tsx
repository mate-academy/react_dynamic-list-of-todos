import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  renderTodos: Todo[]
  activeTodo: Todo | null;
  setActiveTodo: (activeTodo: Todo) => void;
  setActiveTodoUserId: (userId: number) => void
}

export const TodoList: React.FC<Props> = ({
  renderTodos,
  activeTodo,
  setActiveTodo,
  setActiveTodoUserId,
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
      {renderTodos.map((todo) => {
        const {
          id,
          title,
          completed,
        } = todo;

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
                onClick={() => {
                  setActiveTodoUserId(todo.userId);
                  setActiveTodo(todo);
                }}
              >
                <span className="icon">
                  <i className={cn(
                    'far',
                    {
                      'fa-eye': activeTodo?.id !== id,
                      'fa-eye-slash': activeTodo?.id === id,
                    },
                  )}
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
