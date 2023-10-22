import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  onHandleModal: (todo: Todo | null) => void;
  selectedTodo: Todo | null;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
};

export const TodoModal: React.FC<Props> = ({
  onHandleModal = () => {},
  selectedTodo,
  setErrorMessage,
}) => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    if (selectedTodo) {
      getUser(selectedTodo.userId)
        .then((newUser) => {
          setUser(newUser);
        })
        .catch(() => setErrorMessage('Try again later'))
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  return (
    <div
      className="modal is-active"
      data-cy="modal"
    >
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
              {`Todo #${selectedTodo?.id}`}
            </div>
            <button
              aria-label="jsx-a11y"
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => onHandleModal(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {!selectedTodo?.completed
                ? <strong className="has-text-danger">Planned</strong>
                : <strong className="has-text-success">Done</strong>}

              {' by '}

              <a href={`mailto:${user?.name}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
