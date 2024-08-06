import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';

type Props = {
  setShowModal: (v: boolean) => void;
  userId: number | null;
  selectedTodo: Todo | null;
};

export const TodoModal: React.FC<Props> = ({
  setShowModal: showModal,
  userId,
  selectedTodo,
}) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<User>();

  const checkedData = selectedTodo !== null;

  useEffect(() => {
    if (userId != null) {
      setLoading(true);
      getUser(userId)
        .then(setUserData)
        .finally(() => setLoading(false));
    }
  }, [userId]);

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
              Todo #{checkedData && selectedTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={() => showModal(false)}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {checkedData && selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {checkedData && selectedTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${userData?.email}`}>{userData?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
