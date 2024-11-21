import React from 'react';
import { Todo } from '../../types/Todo';
import { EyeId } from '../../types/EyeId';

type Props = {
  todos: Todo[];
  getUserAndTodo: ({ todoId, userId }: EyeId) => void;
  IdTodo?: number;
};

export const TodoList: React.FC<Props> = ({
  todos,
  getUserAndTodo,
  IdTodo,
}) => {
  const handlePickUser = (todoId: number, userId: number) => {
    getUserAndTodo({ todoId, userId });
  };

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
            className={`${todo.id === IdTodo && `has-background-info-light`}`}
            key={todo.id}
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
              <p
                className={`has-text-${todo.completed ? `success` : `danger`}`}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => handlePickUser(todo.id, todo.userId)}
              >
                <span className="icon">
                  <i
                    className={`far ${todo.id === IdTodo ? `fa-eye-slash` : `fa-eye`}`}
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
