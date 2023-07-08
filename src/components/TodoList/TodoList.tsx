import React from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  selectedTodoId: number,
  setSelectedTodoId: (todoId: number) => void,
  showModal: (param: boolean) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  setSelectedTodoId,
  showModal,
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
        {todos.map(todo => {
          const {
            title,
            id,
            completed,
          } = todo;

          return (
            <tr
              data-cy="todo"
              className={classNames(
                {
                  'has-background-info-light': selectedTodoId === id,
                },
              )}
              key={id}
            >
              <td className="is-vcentered">
                {id}
              </td>
              <td
                className="is-vcentered"
              >
                {completed && (
                  <span className="icon">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={classNames(
                    {
                      'has-text-danger': completed === false,
                      'has-text-success': completed,
                    },
                  )}
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
                    showModal(true);
                    setSelectedTodoId(id);
                  }}
                >
                  <span className="icon">
                    <i
                      className={`far ${selectedTodoId === id ? 'fa-eye-slash' : 'fa-eye'}`}
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
};
