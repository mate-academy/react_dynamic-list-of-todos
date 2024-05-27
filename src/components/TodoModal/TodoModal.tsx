import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  selectedTodo: Todo;
  handleCloseModal: () => void;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  handleCloseModal,
}) => {
  const [loadingModal, setLoadingModal] = useState(false);
  const [modalUser, setModalUser] = useState<User | null>(null);

  useEffect(() => {
    setLoadingModal(true);

    getUser(selectedTodo.userId)
      .then(setModalUser)
      .finally(() => setLoadingModal(false));
  }, [selectedTodo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={handleCloseModal} />

      {loadingModal ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectedTodo.id}
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
              {selectedTodo.title}
            </p>

            {modalUser && (
              <p className="block" data-cy="modal-user">
                <strong
                  className={
                    selectedTodo.completed
                      ? 'has-text-success'
                      : 'has-text-danger'
                  }
                >
                  {selectedTodo.completed ? 'Done' : 'Planned'}
                </strong>
                {' by '}
                <a href={`mailto:${modalUser.email}`}>{modalUser.name}</a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
