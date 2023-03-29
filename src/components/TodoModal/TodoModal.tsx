import React, { useCallback, useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';
import { UserInfo } from '../UserInfo';

type Props = {
  setSelectedTodo: (todo: null) => void,
  selectedTodo: Todo,
};

export const TodoModal: React.FC<Props> = ({
  setSelectedTodo,
  selectedTodo,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');

  const {
    id,
    title,
    completed,
    userId,
  } = selectedTodo;

  const loadUserFromServer = useCallback(async () => {
    try {
      const result = await getUser(userId);

      setUser(result);
      setError('');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUserFromServer();
  }, []);

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'x') {
      setSelectedTodo(null);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
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
              {`Todo #${id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setSelectedTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            {error && <h2>{error}</h2>}

            {user !== null && (
              <UserInfo user={user} completed={completed} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
