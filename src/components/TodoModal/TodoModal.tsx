import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  selectedTodo: Todo;
  onCloseSelectedTodo: () => void;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  onCloseSelectedTodo,
}) => {
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);

  useEffect(() => {
    setIsUserLoading(true);
    getUser(selectedTodo.userId)
      .then(setUserDetails)
      .finally(() => setIsUserLoading(false));
  }, [selectedTodo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onCloseSelectedTodo} />
      {isUserLoading ? (
        <Loader />
      ) : (
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
              onClick={onCloseSelectedTodo}
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

              {userDetails && (
                <a href={`mailto:${userDetails.email}`}>{userDetails.name}</a>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
