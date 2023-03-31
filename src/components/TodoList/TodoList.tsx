import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  selectedTodoId: number,
  setTodoId: (id: number) => void,
  setUserId: (id: number) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  setTodoId,
  setUserId,
}) => (
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
        id,
        title,
        completed,
        userId,
      }) => (
        <tr
          data-cy="todo"
          className={classNames({
            'has-background-info-light': selectedTodoId === id,
          })}
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
          <td className="is-vcentered is-expanded">
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
              onClick={() => {
                setTodoId(id);
                setUserId(userId);
              }}
            >
              <span className="icon">
                <i
                  className={classNames(
                    'far',
                    selectedTodoId !== id
                      ? 'fa-eye'
                      : 'fa-eye-slash',
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
