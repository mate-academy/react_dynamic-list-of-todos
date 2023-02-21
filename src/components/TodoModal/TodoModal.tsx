import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';
import { getUser } from '../../api';

interface Props {
  selectedTodo: Todo
  onCloseTodo: (a: Todo | null) => void
}

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  onCloseTodo,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const setUserFromServer = async () => {
      try {
        const userData = await getUser(selectedTodo.userId);

        setUser(userData);
      } catch (error) {
        window.console.warn(error);
      } finally {
        setIsLoading(false);
      }
    };

    setUserFromServer();
  }, []);

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
              {`Todo #${selectedTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => onCloseTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo.completed
                ? (<strong className="has-text-success">Done</strong>)
                : (<strong className="has-text-danger">Planned</strong>)}

              {' by '}

              {!user
                ? (
                  <span>
                    {' Guest'}
                  </span>
                )
                : (
                  <a href={user?.email}>
                    {user?.name}
                  </a>
                )}

            </p>
          </div>
        </div>
      )}
    </div>
  );
};
