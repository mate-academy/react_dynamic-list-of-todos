import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useTodoContext } from '../../context/todoContext';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const { selectedTodo, setSelectedTodo, setActiveEye } = useTodoContext();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const closeModal = () => {
    if (selectedTodo) {
      setActiveEye(prev => ({
        ...prev,
        [selectedTodo.id.toString()]: false,
      }));
    }

    setSelectedTodo(null);
  };

  useEffect(() => {
    if (selectedTodo) {
      setIsLoading(true);

      getUser(selectedTodo.userId)
        .then(setUser)
        .finally(() => setIsLoading(false));
    } else {
      setUser(null); // limpa ao fechar o modal
    }
  }, [selectedTodo]);

  if (!selectedTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectedTodo!.id}
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
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={
                  selectedTodo.completed
                    ? 'has-text-success'
                    : 'has-text-danger'
                }
              >
                {selectedTodo.completed ? 'Done' : 'Planned'}
              </strong>
              {' by '}
              {user && <a href={`mailto:${user.email}`}>{user.name}</a>}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
