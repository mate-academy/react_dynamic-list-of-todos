import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';
import { getUser } from '../../api';

type Props = {
  todo: Todo
  closeTodo: () => void;
};

export const TodoModal: React.FC<Props> = ({ todo, closeTodo }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [userHasError, setUserHasError] = useState(false);
  const {
    id,
    title,
    userId,
    completed,
  } = todo;

  const findUser = async () => {
    try {
      const foundUser = await getUser(userId);

      setUser(foundUser);
    } catch {
      setUserHasError(true);
    } finally {
      setIsUserLoaded(true);
    }
  };

  useEffect(() => {
    findUser();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isUserLoaded ? (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
              {/* Todo #2 */}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeTodo}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              {completed
                ? (
                  <strong className="has-text-success">Done</strong>
                )
                : (
                  <strong className="has-text-danger">Planned</strong>
                )}

              {' by '}

              {userHasError
                ? ('anonymous')
                : (
                  <a href={`mailto:${user?.email}`}>
                    {user?.name}
                  </a>
                )}
            </p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
