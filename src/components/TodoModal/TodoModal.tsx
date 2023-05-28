import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  selectedTodo: Todo | null;
  closeModal: () => void;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  closeModal,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const getUserList = async () => {
    let newUser;

    if (selectedTodo) {
      newUser = await getUser(selectedTodo.id);

      setCurrentUser(newUser);
    }
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {selectedTodo && currentUser ? (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo ${selectedTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo.completed ? (
                <strong className="has-text-danger">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${currentUser.email}`}>
                {currentUser.name}
              </a>
            </p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
