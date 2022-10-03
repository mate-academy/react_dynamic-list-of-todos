/* eslint-disable @typescript-eslint/no-shadow */
import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[],
  selectedTodo: (value: number) => void,
  selectedTodoId: number,
  selectedUserId: (value: number) => void,
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodo,
  selectedTodoId,
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
        {todos.map(({
          id, title, completed, userId,
        }) => (
          <>
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
              <td className={classNames('is-vcentered',
                {
                  'is-expanded': !completed,
                })}
              >
                <p className={
                  completed
                    ? 'has-text-success'
                    : 'has-text-danger'
                }
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
                        <i className="far fa-eye-slash" />
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
          </>
        ))}
      </tbody>
    </table>
  );
};
