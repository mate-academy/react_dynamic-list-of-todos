import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
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

  const { id, completed } = selectedModal;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoding && (
        <Loader />
      )}

      {!isLoding && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
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

            {hasLoadingModalError
              ? (
                <div className="notification is-danger">
                  An error occured when loading data!
                </div>
              )
              : (
                <p className="block" data-cy="modal-user">
                  <strong className={classNames({
                    'has-text-success': completed,
                    'has-text-danger': !completed,
                  })}
                  >
                    {selectedModal.completed
                      ? 'Done'
                      : 'Planned'}
                  </strong>

                  {' by '}

                  <a href={`mailto:${user?.email}`}>
                    {user?.name}
                  </a>
                </p>
              )}
          </div>
        </div>
      )}

    </div>
  );
};
