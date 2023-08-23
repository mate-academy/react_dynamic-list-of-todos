import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  visibleModal: Todo,
  setVisibleModal: (todo: Todo | null) => void;
};

export const TodoModal: React.FC<Props> = ({
  visibleModal, setVisibleModal,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);

    getUser(visibleModal.userId)
      .then(setUser)
      .catch(() => {
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [visibleModal.userId]);

  let statusElement;

  if (visibleModal.completed) {
    statusElement = <strong className="has-text-success">Done</strong>;
  } else {
    statusElement = <strong className="has-text-danger">Planned</strong>;
  }

  let userElement;

  if (user) {
    userElement = <a href={`mailto:${user.email}`}>{user.name}</a>;
  } else if (error) {
    userElement = <span>Error Loading User</span>; // Display error message
  } else {
    userElement = <span>Unknown User</span>;
  }

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
              {`Todo #${visibleModal.id}`}
            </div>
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setVisibleModal(null)}
            >
              <span className="sr-only">Close Modal</span>
            </button>
          </header>
          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {visibleModal.title}
            </p>
            <p className="block" data-cy="modal-user">
              {statusElement}
              by
              {userElement}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
