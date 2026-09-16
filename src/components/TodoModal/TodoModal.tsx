import React, { useEffect, useState } from 'react';

import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

import { getUser } from '../../api';

type Props = {
  todo: Todo;
  onClick: () => void;
};

export const TodoModal: React.FC<Props> = ({ todo, onClick }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getUser(todo.userId)
      .then(userFromServer => {
        setUser(userFromServer);
      })
      .catch(error => setErrorMessage(error.message))
      .finally(() => setIsLoading(false));
  }, [todo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {errorMessage ? (
            <div className="modal-card">
              <header className="modal-card-head">
                <div className="modal-card-title has-text-weight-medium">
                  <p className="has-text-danger has-text-weight-medium">
                    {errorMessage}
                  </p>
                </div>

                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  type="button"
                  className="delete"
                  data-cy="modal-close"
                  onClick={onClick}
                />
              </header>
            </div>
          ) : (
            <div className="modal-card">
              <header className="modal-card-head">
                <div
                  className="modal-card-title has-text-weight-medium"
                  data-cy="modal-header"
                >
                  Todo #{todo?.id}
                </div>

                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  type="button"
                  className="delete"
                  data-cy="modal-close"
                  onClick={onClick}
                />
              </header>

              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {todo.title}
                </p>

                <p className="block" data-cy="modal-user">
                  {todo.completed ? (
                    <strong className="has-text-success">Done</strong>
                  ) : (
                    <strong className="has-text-danger">Planned</strong>
                  )}

                  {' by '}

                  <a href={`mailto:${user?.email}`}>{user?.name}</a>
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
