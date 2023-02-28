import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  defineSelectedId: (a:number) => void,
  selectedTodo: Todo
};

export const TodoModal: React.FC<Props> = ({
  defineSelectedId,
  selectedTodo,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userIsLoading, setUserIsLoading] = useState(false);
  const [isUserLoadidngError, setIsUserLoadingError] = useState(false);
  const handleCloseButton = () => defineSelectedId(0);
  const {
    title,
    userId,
    id,
    completed,
  } = selectedTodo;

  const getUserFromServer = async () => {
    setIsUserLoadingError(false);
    setUserIsLoading(true);

    try {
      const UserFromServer = await getUser(userId);

      setUser(UserFromServer);
    } catch (error) {
      setIsUserLoadingError(true);
    } finally {
      setUserIsLoading(false);
    }
  };

  useEffect(() => {
    getUserFromServer();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {userIsLoading
        ? (
          <Loader />
        )
        : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={handleCloseButton}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {title}
              </p>

              {!isUserLoadidngError && user
                ? (
                  <p className="block" data-cy="modal-user">
                    {completed
                      ? <strong className="has-text-success">Done</strong>
                      : <strong className="has-text-danger">Planned</strong>}

                    {' by '}

                    <a href={`mailto:${user?.email}`}>
                      {user?.name}
                    </a>
                  </p>
                )

                : (
                  <p className="block has-text-danger">
                    Couldn`t load the user
                  </p>
                )}
            </div>
          </div>
        )}
    </div>
  );
};
