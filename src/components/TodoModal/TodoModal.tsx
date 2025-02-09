import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';

type Props = {
  modalTodo: Todo | null;
  setModalTodo: (value: Todo | null) => void;
};

export const TodoModal: React.FC<Props> = React.memo(
  ({ modalTodo, setModalTodo }) => {
    const [loader, setLoader] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState<User>();

    useEffect(() => {
      if (modalTodo === null) {
        return;
      }

      setLoader(true);
      getUser(modalTodo.userId)
        .then(setUser)
        .finally(() => {
          setLoader(false);
          setShowModal(true);
        });
    }, [modalTodo]);

    return (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />

        {loader && <Loader />}
        {showModal && (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #{modalTodo?.id}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => {
                  setModalTodo(null);
                }}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {modalTodo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                {!modalTodo?.completed ? (
                  <strong className="has-text-danger">Planned</strong>
                ) : (
                  <strong className="has-text-success">Done</strong>
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
