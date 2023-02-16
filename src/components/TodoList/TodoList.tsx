import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  todoId: number;
  handleSelect: (id: number, userId: number) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  todoId,
  handleSelect,
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
            key={todo.id}
            data-cy="todo"
            className={cn(
              { 'has-background-info-light': todo.id === todoId },
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
            <td className="is-vcentered is-expanded">
              <p className={cn(
                { 'has-text-danger': !todo.completed },
                { 'has-text-success': todo.completed },
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
                onClick={() => handleSelect(todo.id, todo.userId)}
              >
                <span className="icon">
                  <i className={cn(
                    'far',
                    { 'fa-eye': todo.id !== todoId },
                    { 'fa-eye-slash': todo.id === todoId },
                  )}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
