import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';

type Props = {
  selectedModal: Todo
  onSelectedModal: (todo: Todo | null) => void;
};

export const TodoModal: React.FC<Props> = ({
  selectedModal,
  onSelectedModal,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoding, setIsLoading] = useState(true);
  const [hasLoadingModalError, setHasLoadingModalError] = useState(false);

  useEffect(() => {
    getUser(selectedModal.userId)
      .then(setUser)
      .catch(() => setHasLoadingModalError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoding
        ? (
          <Loader />
        )
        : (
          <div className="modal-card">
            {hasLoadingModalError
              ? (
                <div className="notification is-danger">
                  An error occured when loading data!
                </div>
              )
              : (
                <>
                  <header className="modal-card-head">
                    <div
                      className="modal-card-title has-text-weight-medium"
                      data-cy="modal-header"
                    >
                      {`Todo #${selectedModal.id}`}
                    </div>

                    <button
                      type="button"
                      aria-label="Mute volume"
                      className="delete"
                      data-cy="modal-close"
                      onClick={() => onSelectedModal(null)}
                    />
                  </header>

                  <div className="modal-card-body">
                    <p className="block" data-cy="modal-title">
                      {selectedModal.title}
                    </p>

                    <p className="block" data-cy="modal-user">
                      {selectedModal.completed
                        ? (
                          <strong className="has-text-success">Done</strong>
                        )
                        : (
                          <strong className="has-text-danger">Planned</strong>
                        )}

                      {' by '}

                      <a href={`mailto:${user?.email}`}>
                        {user?.name}
                      </a>
                    </p>
                  </div>
                </>
              )}
          </div>
        )}
    </div>
  );
};
