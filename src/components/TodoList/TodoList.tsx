import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[],
  onSelectedUser: (userId: Todo) => void,
  onSelectedTodo: Todo | null,
}

export const TodoList: React.FC<Props> = React.memo(({
  todos,
  onSelectedUser,
  onSelectedTodo,
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
        {todos.map((todo) => {
          const { id, completed, title } = todo;

          return (
            <tr
              key={id}
              data-cy="todo"
            >
              <td className="is-vcentered">
                {id}
              </td>

              {completed ? (
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                </td>
              ) : (
                <td className="is-vcentered" />
              )}
              <td className="is-vcentered is-expanded">
                <p className={cn({
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
                  onClick={() => {
                    onSelectedUser(todo);
                  }}
                >
                  <span className="icon">
                    <i className={cn('far', {
                      'fa-eye': id !== onSelectedTodo?.id,
                      'fa-eye-slash': id === onSelectedTodo?.id,
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
});
