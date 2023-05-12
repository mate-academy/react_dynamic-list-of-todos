import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';

type Props = {
  handleClose: () => void;
  selectedTodo: Todo | null;
};

export const TodoModal: React.FC<Props> = ({ selectedTodo, handleClose }) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchData = async () => {
    try {
      const currentUser = await getUser(selectedTodo?.userId || 0);

      setUser(currentUser);
    } catch (error) {
      if (error instanceof Error) {
        // eslint-disable-next-line no-console
        console.warn(error.message);
      }

      // eslint-disable-next-line no-console
      console.warn('Unexpected error');
    }
  };

  useEffect(() => {
    fetchData();
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
              {`Todo #${selectedTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo?.completed
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
