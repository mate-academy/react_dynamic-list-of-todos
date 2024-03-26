import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  activeTodo: Todo;
  setActiveTodo: (el: Todo | null) => void;
};

/* eslint-disable react/display-name */
export const TodoModal: React.FC<Props> = React.memo(
  ({ activeTodo, setActiveTodo }) => {
    const [currentUser, setCurrentUser] = useState<User>({} as User);
    const [loading, setLoading] = useState(false);
    const { id, title, completed } = activeTodo;

    useEffect(() => {
      setLoading(true);

      getUser(activeTodo.userId)
        .then(setCurrentUser)
        .catch(() => Promise.reject('Something went wrong!'))
        .finally(() => setLoading(false));
    }, [activeTodo.userId]);

    return (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />

        {loading ? (
          <Loader />
        ) : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #{id}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => setActiveTodo(null)}
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

                <a href={`mailto:${currentUser.email}`}>{currentUser.name}</a>
              </p>
            </div>
          </div>
        )}
      </div>
    );
  },
);
