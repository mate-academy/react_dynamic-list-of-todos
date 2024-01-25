import React, { useContext, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { TodosContext } from '../Store/Store';
import { User } from '../../types/User';
import { getUser } from '../../utils/users';

type Props = {};

export const TodoModal: React.FC<Props> = () => {
  const { selectedTodo, setSelectedTodo } = useContext(TodosContext);

  const {
    id,
    title,
    completed,
    userId,
  } = selectedTodo || {};

  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);

  const closeModal = () => {
    setSelectedTodo(null);
  };

  useEffect(() => {
    if (userId) {
      setLoadingUser(true);

      setTimeout(() => { // loading too fast
        getUser(userId)
          .then((userData: User) => setUser(userData))
          .catch(() => {})
          .finally(() => {
            setLoadingUser(false);
          });
      }, 100);
    }
  }, [userId]);

  // eslint-disable-next-line no-console
  console.log('TodoModal');

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loadingUser ? (
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
              onClick={closeModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              <a href={user?.email}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
