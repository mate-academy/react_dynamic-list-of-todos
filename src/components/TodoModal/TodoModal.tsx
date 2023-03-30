import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

interface Props {
  selectedTodo: Todo,
  onClose: () => void,
}

export const TodoModal: React.FC<Props> = (props) => {
  const { selectedTodo, onClose } = props;
  const {
    id,
    title,
    userId,
    completed,
  } = selectedTodo;

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const userFromServer = await getUser(userId);

        setUser(userFromServer);
      } catch {
        setUser(null);
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user && isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              aria-label="close a modal"
              onClick={onClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            {user && (
              <p className="block" data-cy="modal-user">
                {completed ? (
                  <strong className="has-text-success">
                    Done
                  </strong>
                ) : (
                  <strong className="has-text-danger">
                    Planned
                  </strong>
                )}

                {' by '}

                <a href={`mailto:${user.email}`}>
                  {user.name}
                </a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
