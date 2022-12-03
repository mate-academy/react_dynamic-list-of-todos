import React, { useState, useEffect } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';

type Props = {
  todo: Todo,
  closeTodoModel: () => void
};

export const TodoModal: React.FC<Props> = ({
  todo,
  closeTodoModel,
}) => {
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const getUserFromApi = async (userId: number) => {
    const userFromApi = await getUser(userId);

    if (userFromApi) {
      setIsUserLoading(false);

      setUserName(userFromApi.name);
      setUserEmail(userFromApi.email);
    }
  };

  useEffect(() => {
    getUserFromApi(todo.userId);
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isUserLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => closeTodoModel()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo.completed
                ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}

              {' by '}

              <a href={`mailto:${userEmail}`}>
                {userName}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
