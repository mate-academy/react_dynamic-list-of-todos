import React from 'react';

import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todos: Todo[] | null;
  onSelect?: (todo: Todo | null) => void;
  selectedPosts: Todo | null;
};

export const TodoList: React.FC<Props> = React.memo(
  ({ todos, onSelect = () => {}, selectedPosts }) => {
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
          {todos?.map(todo => {
            return (
              <tr
                key={todo.id}
                data-cy="todo"
                className={cn(
                  selectedPosts?.id === todo.id
                    ? 'has-background-info-light'
                    : '',
                )}
              >
                <td className="is-vcentered">{todo.id}</td>

                <td className="is-vcentered">
                  {todo.completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>

                <td className="is-vcentered" />
                <td className="is-vcentered is-expanded">
                  <p
                    className={cn(
                      'has-text',
                      todo.completed ? 'has-text-success' : 'has-text-danger',
                    )}
                  >
                    {todo.title}
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
                      <i
                        className={cn(
                          'far',
                          selectedPosts?.id === todo.id
                            ? 'fa-eye-slash'
                            : 'fa-eye',
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
  },
);

TodoList.displayName = 'TodoList';
