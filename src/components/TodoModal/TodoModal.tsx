import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { OnTodoClick } from '../../types/functions';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  selectedTodo: Todo;
  onTodoClick: OnTodoClick;
};

export const TodoModal: React.FC<Props> = ({ selectedTodo, onTodoClick }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUserError, setLoadingUserError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUser(selectedTodo.userId)
      .then(loadedUser => setUser(loadedUser))
      .catch(error => setLoadingUserError(error))
      .finally(() => setIsLoading(false));
  }, [selectedTodo]);

  const handleCloseClick = () => {
    onTodoClick(null);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {user ? (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectedTodo.id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleCloseClick}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      ) : isLoading ? (
        <Loader />
      ) : (
        loadingUserError.toString()
      )}
    </div>
  );
};
