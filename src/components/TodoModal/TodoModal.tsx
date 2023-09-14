import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';

type Props = {
  setIsModal: (value: boolean) => void;
  user?: User | null;
  currentTodo?: Todo
  userId: number
  setUser: (value: User) => void;
};

export const TodoModal: React.FC<Props> = ({
  setIsModal,
  user,
  currentTodo,
  userId,
  setUser,
}) => {
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    setModalLoading(true);

    getUser(userId)
      .then(setUser)
      .finally(() => {
        setModalLoading(false);
      });
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {modalLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {currentTodo?.id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              aria-label="modal-close"
              onClick={() => setIsModal(false)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo?.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              <a href="mailto:Sincere@april.biz">
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
