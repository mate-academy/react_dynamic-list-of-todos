import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  isActive: number | null;
  setIsActive: React.Dispatch<React.SetStateAction<number | null>>;
  activeTodo?: Todo | null;
};

export const TodoModal: React.FC<Props> = ({
  isActive,
  setIsActive,
  activeTodo,
}) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loader, setLoader] = useState<boolean>(true);

  useEffect(() => {
    if (!activeTodo) {
      return;
    }

    if (typeof activeTodo.userId !== 'number') {
      setUser(undefined);
      setLoader(false);

      return;
    }

    setLoader(true);
    let cancelled = false;

    getUser(activeTodo.userId)
      .then(data => {
        if (!cancelled) {
          setUser(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setUser(undefined);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoader(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [activeTodo, isActive]);
  if (typeof isActive !== 'number') {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loader || !activeTodo ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${isActive}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setIsActive(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {activeTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={classNames({
                  'has-text-success': activeTodo.completed,
                  'has-text-danger': !activeTodo.completed,
                })}
              >
                {activeTodo.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
