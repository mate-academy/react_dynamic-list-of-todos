import React, { memo } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  selectedId?: number,
  onSelected: (userId: number) => void,
};

export const TodoList: React.FC<Props> = memo(({
  todos,
  selectedId,
  onSelected,
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
        {todos.map(todo => (
          <tr
            data-cy="todo"
            className={cn(
              { 'has-background-info-light': todo.id === selectedId },
            )}
            key={todo.id}
          >
            <td className="is-vcentered">
              {todo.id}
            </td>
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
                className={cn('',
                  { 'has-text-success': todo.completed },
                  { 'has-text-danger': !todo.completed })}
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
                  onSelected(todo.id);
                }}
              >
                <span className="icon">
                  <i className={cn('far',
                    { 'fa-eye': todo.id !== selectedId },
                    { 'fa-eye-slash': todo.id === selectedId })}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});
