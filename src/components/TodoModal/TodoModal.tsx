import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

type Props = {
  userId: number,
  todo: Todo | null
  onHide: () => void,
};

export const TodoModal: React.FC<Props> = ({
  userId,
  todo,
  onHide,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({} as User);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getUser(userId)
      .then(setUser)
      .catch(setErrorMessage)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {errorMessage ? (
            <ErrorMessage errorMessage={errorMessage} />
          ) : (
            <div className="modal-card">
              <header className="modal-card-head">
                <div
                  className="modal-card-title has-text-weight-medium"
                  data-cy="modal-header"
                >
                  {`Todo #${todo?.id}`}
                </div>

                <button
                  type="button"
                  className="delete"
                  data-cy="modal-close"
                  onClick={onHide}
                  aria-label="modal-close"
                />
              </header>

              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {todo?.title}
                </p>

                <p className="block" data-cy="modal-user">
                  {todo?.completed ? (
                    <strong className="has-text-success">Done</strong>
                  ) : (
                    <strong className="has-text-danger">Planned</strong>
                  )}

                  {' by '}

                  <a href={`mailto:${user.email}`}>
                    {user.name}
                  </a>
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
