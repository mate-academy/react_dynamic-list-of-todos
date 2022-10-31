import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  isLoading: boolean,
  setIsLoadingUser: (value: boolean) => void
  onClose: (value: number) => void
  currentTodo: Todo,
};

export const TodoModal: React.FC<Props> = ({
  isLoading,
  setIsLoadingUser,
  onClose,
  currentTodo,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const {
    id, title, completed, userId,
  } = currentTodo;

  useEffect(() => {
    const getUserFromApi = async () => {
      try {
        const response = await getUser(userId);

        setUser(response);
        setIsLoadingUser(false);
      } catch (e) {
        throw new Error('Error on loading user');
      }
    };

    getUserFromApi();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                onClose(0);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}

              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
