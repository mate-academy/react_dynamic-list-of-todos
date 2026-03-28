import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  selectedTodo: Todo | null;
  showModal: (close: boolean) => void;
  resetSelectedTodo: (todo: null) => void;
};

export const TodoModal = React.memo<Props>(
  ({ showModal, selectedTodo, resetSelectedTodo }) => {
    const [user, setUser] = useState<User>();
    const [errorMessage, setErrorMessage] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (selectedTodo?.userId) {
        getUser(selectedTodo.userId)
          .then(setUser)
          .catch(() => setErrorMessage(true))
          .finally(() => setLoading(false));
      }
    }, [selectedTodo]);

    const handleButtonCloseModal = useCallback(() => {
      showModal(false);
      resetSelectedTodo(null);
    }, []);

    return (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />

        {loading && <Loader />}
        {errorMessage && (
          <p style={{ color: 'red', fontSize: '22px' }}>
            Opps something wrong, please try again later!!!
          </p>
        )}
        {!loading && !errorMessage && (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #{selectedTodo?.id}
              </div>

              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={handleButtonCloseModal}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {selectedTodo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                {selectedTodo?.completed ? (
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
  },
);

TodoModal.displayName = 'TodoModal';
