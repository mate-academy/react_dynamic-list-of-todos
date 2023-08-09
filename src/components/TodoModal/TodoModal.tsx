import React, { useContext, useEffect, useState } from 'react';
import { getUser } from '../../api';
import { TodosContext } from '../../TodosContext';
import { User } from '../../types/User';
import { Loader } from '../Loader';

const ERROR_MESSAGE_USER = 'Failed to load user data';

export const TodoModal: React.FC = () => {
  const {
    modalId,
    selectedTodo,
    setIsTodoModal,
    setSelectedTodo,
  } = useContext(TodosContext);
  const [isLoadingModal, setIsLoadingModal] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [userError, setUserError] = useState('');

  useEffect(() => {
    getUser(modalId as number)
      .then(newUser => {
        setUser(newUser);
        setIsLoadingModal(false);
      })
      .catch(() => {
        setUserError(ERROR_MESSAGE_USER);
        setIsLoadingModal(false);
      });
  }, []);

  const handleButtonClick = () => {
    setIsTodoModal(false);
    setUser(null);
    setSelectedTodo(null);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoadingModal ? (
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
              type="button"
              className="delete"
              data-cy="modal-close"
              aria-label="Close info"
              onClick={handleButtonClick}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {
                selectedTodo?.completed
                  ? (<strong className="has-text-success">Done</strong>)
                  : (<strong className="has-text-danger">Planned</strong>)
              }

              {' by '}

              {
                userError
                  ? (<p className="error">{userError}</p>)
                  : (
                    <a href={`mailto:${user?.email}`}>
                      {user?.name}
                    </a>
                  )
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
