import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { ErrorMeassage } from '../ErrorMessage';
import { Loader } from '../Loader';

type Props = {
  todo: Todo | null,
  onCloseModal: () => void,
  isError: boolean,
  setIsError: (value: boolean) => void,
};

export const TodoModal: React.FC<Props> = ({
  todo,
  onCloseModal,
  isError,
  setIsError,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const loadUser = async () => {
    try {
      const loadedUser = await getUser(todo?.userId || 0);

      setUser(loadedUser);
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  if (isError) {
    return <ErrorMeassage />;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onCloseModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo?.completed
                ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}
              {' by '}

              <a href="mailto:Sincere@april.biz">
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
