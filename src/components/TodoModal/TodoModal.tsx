import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';

interface Props {
  currntUserId: number | null,
  selectedTodo: Todo | null,
  onSelectedTodoChange: (arg: Todo | null) => void,
}

export const TodoModal: React.FC<Props> = ({
  currntUserId,
  selectedTodo,
  onSelectedTodoChange,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userUploaded, setUserUploaded] = useState(false);
  const [isUSerError, setIsUSerError] = useState(false);

  useEffect(() => {
    const loadUser = async (id: number) => {
      try {
        const loadedUser = await getUser(id);

        setUser(loadedUser);
        setUserUploaded(true);
      } catch (error) {
        setUserUploaded(true);
        setIsUSerError(true);
      }
    };

    if (currntUserId) {
      loadUser(currntUserId);
    }
  }, [currntUserId]);

  const handleCloseModal = () => {
    onSelectedTodoChange(null);
  };

  const shouldDisplayModal = userUploaded && selectedTodo && user;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isUSerError && (
        <div className="modal-card">
          <div className="message p-2 my-4 is-danger">
            <p className="message-body">Error loading data</p>
          </div>
        </div>
      )}

      {shouldDisplayModal
        ? (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${selectedTodo.id}`}
              </div>

              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={handleCloseModal}
                aria-label="Close modal"
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {selectedTodo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {selectedTodo.completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>}

                {' by '}

                <a href={`mailto:${user.email}`}>
                  {user.name}
                </a>
              </p>
            </div>
          </div>
        )
        : (
          <Loader />
        )}

    </div>
  );
};
