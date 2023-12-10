/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';

type Props = {
  selectedTodo: Todo;
  onSelectedTodo: () => void;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  onSelectedTodo,
}) => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');

  const loadUser = async () => {
    try {
      setIsLoading(true);
      const userFromServer = await getUser(selectedTodo?.userId);

      setUser(userFromServer);
    } catch {
      setIsError('No todo found');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {(isLoading && !isError) && (
        <Loader />
      )}

      {(isError && !isLoading) && (
        { isError }
      )}

      {(!isError && !isLoading && user) && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo.id}`}
            </div>

            <button
              aria-label="close"
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onSelectedTodo}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo.completed ? (
                <strong className="has-text-success">
                  Done
                </strong>
              ) : (
                <strong className="has-text-danger">
                  Planned
                </strong>
              )}

              {' by '}

              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
