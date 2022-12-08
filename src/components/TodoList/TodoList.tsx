import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  selectedUserId: number,
  selectUserId: (newUserId: number) => void,
  selectedTodo: (todo: Todo | null) => void,
};

export const TodoList: React.FC<Props> = (
  {
    todos, selectedUserId, selectUserId, selectedTodo,
  },
) => (
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
          id,
          userId,
          title,
          completed,
        } = todo;

        return (
          <tr
            data-cy="todo"
            className=""
            key={id}
          >
            <td className="is-vcentered">{id}</td>
            {completed
              ? (
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                </td>
              )
              : <td className="is-vcentered" />}
            <td className="is-vcentered is-expanded">
              <p
                className={classNames({
                  'has-text-danger': !completed,
                  'has-text-success': completed,
                })}
              >
                {title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              {selectedUserId === userId
                ? (
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => {
                      selectedTodo(null);
                      selectUserId(0);
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
                      selectUserId(userId);
                      selectedTodo(todo);
                    }}
                  >
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  </button>
                )}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
