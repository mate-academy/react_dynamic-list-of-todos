import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';

type TodoModalProps = {
  selectedTodo: Todo | null;
  closeModal: () => void;
};

export const TodoModal: React.FC<TodoModalProps> = (
  { selectedTodo, closeModal },
) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    if (selectedTodo) {
      setLoading(true);
      getUser(selectedTodo.userId)
        .then(userData => {
          setUser(userData);
        })
        .catch(() => {
          // eslint-disable-next-line no-console
          setUser({ name: 'no user found', email: '' });
        })
        .finally(() => setLoading(false));
    }
  }, []);

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
              {`Todo #${selectedTodo?.id}`}
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
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className={`has-text-${selectedTodo?.completed ? 'success' : 'danger'}`}>
                {selectedTodo?.completed ? 'Done' : 'Planned'}
              </strong>

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
