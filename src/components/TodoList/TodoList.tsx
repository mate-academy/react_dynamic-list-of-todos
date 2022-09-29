import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[],
  selectedTodoIdId: number,
  setselectedTodoId: (value: number) => void,
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoIdId,
  setselectedTodoId,
}) => {
  const handlerClickReset = () => {
    setselectedTodoId(0);
  };

  const handlerClickSelect = (id: number) => {
    setselectedTodoId(id);
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
        {todos.map(({
          id, completed, title,
        }) => (
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
              <p className={classNames('has-text-success',
                {
                  'has-text-danger': !completed,
                })}
              >
                {title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={selectedTodoIdId === id
                  ? handlerClickReset
                  : () => handlerClickSelect(id)}
              >
                {selectedTodoIdId === id
                  ? (
                    <span className="icon">
                      <i className="far fa-eye-slash" />
                    </span>
                  )
                  : (
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>

                  )}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
