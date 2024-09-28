import React from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';

type Props = {
  visibleTodos: Todo[];
  activeTodo: Todo | null;
  handleEyeChange: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({
  visibleTodos,
  handleEyeChange,
  activeTodo,
}) => {
  return (
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
        {visibleTodos.map(todo => (
          <tr
            data-cy="todo"
            className={cn({
              'has-background-info-light': activeTodo?.id === todo.id,
            })}
            key={todo.id}
          >
            <td className="is-vcentered">{todo.id}</td>
            {todo.completed ? (
              <td className="is-vcentered">
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              </td>
            ) : (
              <td className="is-vcentered" />
            )}
            <td className="is-vcentered is-expanded">
              <p
                className={cn('has-text-success', {
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
                onClick={() => handleEyeChange(todo.id)}
              >
                <span className="icon">
                  {activeTodo?.id !== todo.id ? (
                    <i className="far fa-eye" />
                  ) : (
                    <i className="far fa-eye-slash" />
                  )}
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
