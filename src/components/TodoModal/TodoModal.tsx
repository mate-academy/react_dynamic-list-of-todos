import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';

type Props = {
  checkedTodo: Todo | null;
  closeModal: (value: Todo | null) => void;
  resetTodoClickedState: () => void;
};

export const TodoModal: React.FC<Props> = ({
  checkedTodo,
  closeModal,
  resetTodoClickedState,
}) => {
  const [loadingModal, setLoadingModal] = useState(false);
  const [userSt, setUserSt] = useState<User | null>(null);

  useEffect(() => {
    setLoadingModal(true);
    if (checkedTodo !== null) {
      getUser(checkedTodo.userId)
        .then(setUserSt)
        .finally(() => setLoadingModal(false));
    }
  }, [checkedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loadingModal ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${checkedTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                closeModal(null);
                resetTodoClickedState();
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {checkedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              {checkedTodo?.completed === true ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${userSt?.email}`}>{userSt?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
