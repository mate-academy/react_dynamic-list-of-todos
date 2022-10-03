import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  todoId: number,
  selectId: (value: number) => void,
  selectUserId: (value: number) => void,
  clickedButton: (value: boolean) => void,
  selectClickedButton: boolean,
};

export const TodoList: React.FC<Props> = ({
  todos,
  todoId,
  selectId,
  selectUserId,
  clickedButton,
  selectClickedButton,

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
          <>
            <tr data-cy="todo" className="has-background-info-light">
              <td
                className="is-vcentered"
                key={todo.id}
              >
                {todo.id}
              </td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={classNames('has-text-success',
                    { 'has-text-danger': todo.completed === false })}
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => {
                    selectId(todo.id);
                    selectUserId(todo.userId);
                    clickedButton(true);
                  }}
                >
                  {selectClickedButton && todo.id === todoId ? (
                    <span className="icon">
                      <i className="far fa-eye-slash" />
                    </span>
                  ) : (
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  )}

                </button>
              </td>
            </tr>
          </>
        ))}
      </tbody>
    </table>
  );
};
