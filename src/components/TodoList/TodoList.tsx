import cn from 'classnames';
import React from 'react';

import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[]
  selectedTodoId: number;
  onSetSelectedTodoId: (value: number) => void;
  onSetUserId: (value: number) => void;
};

export const TodoList: React.FC<Props> = React.memo(({
  todos,
  selectedTodoId,
  onSetSelectedTodoId,
  onSetUserId,
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
            className=""
            key={todo.id}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">

              <p
                className={cn({
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
                })}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              {selectedTodoId === todo.id ? (
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => {
                    onSetSelectedTodoId(0);
                  }}
                >
                  <span className="icon">
                    <i className="far fa-eye-slash" />
                  </span>
                </button>

              ) : (
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => {
                    onSetSelectedTodoId(todo.id);
                    onSetUserId(todo.userId);
                  }}
                >
                  <span className="icon">
                    <i className="far fa-eye" />
                  </span>
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});
