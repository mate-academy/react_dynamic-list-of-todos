import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  todoId: number,
  userId: number
  selectTodoId: (newValue: number) => void,
};

export const TodoModal: React.FC<Props> = ({
  todos,
  todoId,
  userId,
  selectTodoId,
}) => {
  const [userInfo, setUserInfo] = useState<User>();
  const findTodo = todos.find(user => user.id === todoId);

  useEffect(() => {
    const loadUserTodo = async () => {
      setUserInfo(await getUser(userId));
    };

    loadUserTodo();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {userInfo === undefined ? (
        <Loader />
      ) : (

        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {todoId}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => selectTodoId(0)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {findTodo?.title}
            </p>

            {findTodo?.completed ? (
              <p className="block" data-cy="modal-user">
                <strong className="has-text-success">Done</strong>

                {' by '}

                <a href={`mailto:${userInfo.email}`}>
                  {userInfo.name}
                </a>
              </p>
            ) : (
              <p className="block" data-cy="modal-user">
                <strong className="has-text-danger">Planned</strong>

                {' by '}

                <a href="mailto:Sincere@april.biz">
                  {userInfo.name}
                </a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
