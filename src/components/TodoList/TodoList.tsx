import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  todos: Todo[],
  setActiveTodo: (todo: Todo) => void,
  activeTodo?: Todo,
  setUserInfo: (value: User) => void
};

export const TodoList: React.FC<Props> = ({
  todos,
  setActiveTodo,
  activeTodo,
  setUserInfo,
}) => {
  const loadUserTodo = async () => {
    setUserInfo(await getUser(activeTodo?.userId));
  };

  if (activeTodo) {
    loadUserTodo();
  }

  const handleClick = (
    id: number,
    userId: number,
    title: string,
    completed: boolean,
  ) => {
    setActiveTodo({
      id, userId, title, completed,
    });
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
                    handleClick(id, userId, title, completed);
                  }}
                >
                  {activeTodo && id === activeTodo?.id ? (
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
