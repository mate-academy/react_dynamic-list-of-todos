import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo[],
  selectedTodoId: number | null,
  selectedTodo: (value: number | null) => void,
  selectedUserId: (value: number | null) => void,
}

export const TodoList: React.FC<Props> = ({
  todo,
  selectedTodoId,
  selectedTodo,
  selectedUserId,
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
        {todo.map(({
          id, userId, completed, title,
        }) => (
          <tr
            data-cy="todo"
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
            <td className={classNames('is-vcentered',
              {
                'is-expanded': completed === false,
              })}
            >
              <p className={classNames({
                'has-text-danger': !completed,
                'has-text-success': completed,
              })}
              >
                {title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              {selectedTodoId === id
                ? (
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => {
                      selectedTodo(0);
                      selectedUserId(0);
                    }}
                  >
                    <span className="icon">
                      <i className="far fa-eye-slash " />
                    </span>
                  </button>
                )
                : (
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => {
                      selectedTodo(id);
                      selectedUserId(userId);
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
};
