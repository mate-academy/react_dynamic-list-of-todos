import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  selectedTodo: Todo;
  onClose: (todoId: number) => void;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  onClose,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [hasLoadingError, setHasLoadingError] = useState(false);

  const hideModal = () => {
    onClose(0);
  };

  const waitForUsers = async (currentTodo: Todo | null) => {
    try {
      if (currentTodo) {
        const userFromServer = await getUser(currentTodo.userId);

        setUser(userFromServer);
        setHasLoadingError(false);
      }
    } catch {
      setHasLoadingError(true);
    }
  };

  useEffect(() => {
    waitForUsers(selectedTodo);
  }, []);

  const isLoadingFinished = (hasLoadingError && user === null) || user;

  const { id, title, completed } = selectedTodo;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {(!isLoadingFinished) ? (
        <Loader />
      ) : (
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
              onClick={() => hideModal()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {hasLoadingError ? (
                <p className="has-text-danger">
                  Can&apos;t load user data from server
                </p>
              )
                : (
                  <>
                    {completed
                      ? (
                        <strong className="has-text-success">Done</strong>
                      )
                      : (
                        <strong className="has-text-danger">Planned</strong>
                      )}

                    {' by '}

                    {user ? (
                      <a href="mailto:Sincere@april.biz">
                        {user.name}
                      </a>
                    )
                      : (
                        <span className="has-text-danger">
                          User not found
                        </span>
                      )}
                  </>
                )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
