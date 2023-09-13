import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';

type Props = {
  chosenTodo: Todo | null;
  closeModal: () => void;
};

export const TodoModal: React.FC<Props> = ({
  chosenTodo,
  closeModal,
}) => {
  const [loadingUser, setLoadingUser] = useState(false);
  const [userError, setUserError] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      setLoadingUser(true);
      setUserError(false);
      setUser(null);

      if (chosenTodo) {
        getUser(chosenTodo?.userId).then(setUser).catch(e => {
          setUserError(e.message);
        }).finally(() => setLoadingUser(false));
      }
    };

    loadUser();
  }, [chosenTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {userError && <p>{userError}</p>}
      {loadingUser && <Loader />}
      {user && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${chosenTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => closeModal()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {chosenTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {chosenTodo?.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
