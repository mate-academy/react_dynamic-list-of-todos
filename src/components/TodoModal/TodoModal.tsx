import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  selectedTodo: Todo | null;
  setModal: (a: boolean) => void;
  setModalLoading: (a: boolean) => void;
  setSelectedTodo: (a: Todo | null) => void;
  modalLoading: boolean;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  setSelectedTodo,
  setModal,
  setModalLoading,
  modalLoading,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    setModalLoading(true);
    if (selectedTodo) {
      getUser(selectedTodo.userId)
        .then(user => {
          setSelectedUser(user);
        })
        .finally(() => setModalLoading(false));
    }
  }, [selectedTodo, setModalLoading]);

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
              {`Todo #${selectedTodo?.id}`}

            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setModal(false);
                setSelectedTodo(null);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className={
                selectedTodo?.completed
                  ? 'has-text-success'
                  : 'has-text-danger'
              }
              >
                {selectedTodo?.completed
                  ? 'Done'
                  : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${selectedUser?.email}`}>
                {selectedUser?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
