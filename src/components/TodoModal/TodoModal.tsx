import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

interface Props {
  todo: Todo | null;
  closeMod: () => void;
}

export const TodoModal: React.FC<Props> = ({ todo, closeMod }) => {
  const [modalLoad, setModalLoad] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadUser = async (userId: number) => {
    try {
      setUser(null);
      setError(null);
      setModalLoad(true);

      const fetchedUser = await getUser(userId);

      setUser(fetchedUser);
    } catch {
      setError('User loading failed!!!');
    } finally {
      setModalLoad(false);
    }
  };

  useEffect(() => {
    if (todo) {
      loadUser(todo.userId);
    }
  }, [todo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {modalLoad && <Loader />}

      {!modalLoad && !error && user && (
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
              onClick={closeMod}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={`${todo?.completed ? 'has-text-success' : 'has-text-danger'}`}
              >
                {todo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
