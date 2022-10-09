import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  todoId: number,
  setTodoId: (value: number) => void,
  setUserId: (value: number) => void,
  setClickedButtonUserInfo: (value: boolean) => void,
  clickedButtonUserInfo: boolean,
};

export const TodoList: React.FC<Props> = ({
  todos,
  todoId,
  setTodoId,
  setUserId,
  setClickedButtonUserInfo,
  clickedButtonUserInfo,

}) => {
  const handleClick = (id: number, userId: number) => {
    setTodoId(id);
    setUserId(userId);
    setClickedButtonUserInfo(true);
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
          id,
          completed,
          title,
          userId,
        }) => (
          <>
            <tr data-cy="todo" className="has-background-info-light">
              <td
                className="is-vcentered"
                key={id}
              >
                {id}
              </td>
              <td className="is-vcentered">
                {completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={classNames('has-text-success',
                    { 'has-text-danger': !completed })}
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
                    handleClick(id, userId);
                  }}
                >
                  {clickedButtonUserInfo && id === todoId ? (
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
