import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  setIsOpedModal: (newValue: boolean) => void;
  selectedTodo: Todo | null;
  setSelectedTodo: (newValue: Todo | null) => void;

};

export const TodoModal: React.FC<Props> = ({
  setIsOpedModal,
  selectedTodo,
  setSelectedTodo,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    if (selectedTodo?.userId) {
      getUser(selectedTodo.userId)
        .then(setSelectedUser)
        .catch(() => {
          setSelectedUser(null);
        });
    } else {
      setSelectedUser(null);
    }
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!selectedUser ? (
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
            <button
              aria-label="button delete"
              onClick={() => {
                setIsOpedModal(false);
                setSelectedTodo(null);
              }}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo?.completed
                ? (<strong className="has-text-success">Done</strong>)
                : (<strong className="has-text-danger">Planned</strong>)}

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
