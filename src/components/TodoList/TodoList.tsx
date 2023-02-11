import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  activeTodoId: number,
  onClick: (todoId: number, userId: number) => void,
};

export const TodoList: React.FC<Props> = React.memo(
  ({ todos, activeTodoId, onClick }) => (
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
            id, userId, title, completed,
          } = todo;

          return (
            <tr
              data-cy="todo"
              className=""
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
              <td>
                <p className={completed
                  ? 'has-text-success'
                  : 'has-text-danger'}
                >
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => onClick(id, userId)}
                >
                  <span className="icon">
                    <i className={activeTodoId === id
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
  ),
);
