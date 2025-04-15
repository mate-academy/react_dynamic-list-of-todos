import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  pick: Todo;
  getUsers: (userId: number) => Promise<User>;
  setDefault: () => void;
};

export const TodoModal: React.FC<Props> = ({ pick, getUsers, setDefault }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoadingUser(true);
      const user = await getUsers(pick.userId);

      setCurrentUser(user);
      setLoadingUser(false);
    };

    fetchUser();
  }, [pick]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      <div className="modal-card">
        <header className="modal-card-head">
          <p
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{pick.id}
          </p>
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            aria-label="close"
            onClick={() => setDefault()}
          />
        </header>

        <div className="modal-card-body">
          {loadingUser ? (
            <Loader loadingTodos={loadingUser} />
          ) : (
            <>
              <p className="block" data-cy="modal-title">
                {pick.title}
              </p>

              <p className="block" data-cy="modal-user">
                <strong
                  className={
                    pick.completed ? 'has-text-success' : 'has-text-danger'
                  }
                >
                  {pick.completed ? 'Done' : 'Planned'}
                </strong>
                {' by '}
                <a href={`mailto:${currentUser?.email}`}>{currentUser?.name}</a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
