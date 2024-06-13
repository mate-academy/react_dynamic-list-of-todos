import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

interface Props {
  modalOpen: boolean;
  selectedTodo: Todo | null;
  handleCloseModal: () => void;
}

export const TodoModal: React.FC<Props> = ({
  modalOpen,
  selectedTodo,
  handleCloseModal,
}) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (selectedTodo) {
      setLoading(true);
      getUser(selectedTodo.userId)
        .then(setUser)
        .finally(() => setLoading(false));
    }
  }, [selectedTodo]);

  // Reset user state when modal closes
  useEffect(() => {
    if (!modalOpen) {
      setUser(null);
    }
  }, [modalOpen]);

  return (
    <div className={`modal ${modalOpen ? 'is-active' : ''}`} data-cy="modal">
      <div className="modal-background" onClick={handleCloseModal} />

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

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleCloseModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={`has-text-${selectedTodo?.completed ? 'success' : 'danger'}`}
              >
                {selectedTodo?.completed ? 'Done' : 'Planned'}
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
