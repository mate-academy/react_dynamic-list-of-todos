import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

interface Props {
  selectedTodo: Todo;
  onCloseModal: (value: null) => void;
}

export const TodoModal: React.FC<Props> = ({ selectedTodo, onCloseModal }) => {
  const [loaded, setLoaded] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const { userId, id, title, completed } = selectedTodo;

  useEffect(() => {
    const loadUser = async () => {
      const loadedUser = getUser(userId);

      setUser(await loadedUser);
      setLoaded(false);
    };

    loadUser();
  }, [userId]);

  const handleButtonClose = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      onCloseModal(null);
    },
    [onCloseModal],
  );

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loaded ? (
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
              onClick={handleButtonClose}
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

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
