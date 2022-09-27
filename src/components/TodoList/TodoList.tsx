import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[],
  selectedTodoId: number,
  selectedTodo: (value: number) => void,
  selectedUserId: (value: number) => void,
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  selectedTodo,
  selectedUserId,
}) => {
  const handlerClickReset = () => {
    selectedTodo(0);
    selectedUserId(0);
  };

  const handlerClickSelect = (id: number, userId: number) => {
    selectedTodo(id);
    selectedUserId(userId);
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
          id, userId, completed, title,
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
                'is-expanded': completed === false,
              })}
            >
              <p className={
                completed === false
                  ? 'has-text-danger'
                  : 'has-text-success'
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
                    onClick={handlerClickReset}
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
                    onClick={() => handlerClickSelect(id, userId)}
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
