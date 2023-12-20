import React from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  selectedTodo: Todo | null,
  setSelectedTodo: (todo: Todo) => void,
  setSelectedUserId: (id: number) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodo,
  setSelectedTodo,
  setSelectedUserId,
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
      {todos.map(todo => {
        const {
          id, title, completed, userId,
        } = todo;

        return (
          <tr
            data-cy="todo"
            className={cn({
              'has-background-info-light': (
                selectedTodo?.id === id
              ),
            })}
            key={id}
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
                className={cn(
                  {
                    'has-text-danger': !completed,
                    'has-text-success': completed,
                  },
                )}
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
                  setSelectedTodo(todo);
                  setSelectedUserId(userId);
                }}
              >
                <span className="icon">
                  <i className={selectedTodo?.id === id
                    ? 'far fa-eye-slash'
                    : 'far fa-eye'}
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
