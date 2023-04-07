import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  currentTodo: Todo,
  OnCloseModal: () => void,
};

export const TodoModal: React.FC<Props> = React.memo(
  ({
    currentTodo,
    OnCloseModal,
  }) => {
    const [user, setUser] = useState<User | null>(null);

    const { id, title, completed } = currentTodo;

    const loadUser = useCallback(
      async () => {
        try {
          const loadedUser = await getUser(id);

          setUser(loadedUser);
        } catch {
          setUser(null);
        }
      }, [user],
    );

    useEffect(() => {
      loadUser();
    }, []);

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
                {`Todo #${id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={OnCloseModal}
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

                <a href={`mailto:${user.email}`}>
                  {user.name}
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    );
  },
);
