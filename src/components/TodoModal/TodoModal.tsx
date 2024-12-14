import React, { useEffect } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { useState } from 'react';
import { Dispatch, SetStateAction } from 'react';

export const TodoModal: React.FC<{
  todos: Todo[];
  selectedTodoId: number;
  onClose: Dispatch<SetStateAction<number | null>>;
}> = ({ todos, selectedTodoId, onClose }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const todo = todos.find(innertodo => innertodo.id === selectedTodoId);
  const { id, title, userId, completed } = todo as Todo;

  function handleClose() {
    onClose(null);
  }

  useEffect(() => {
    getUser(userId).then(response => {
      setUser(response);
      setIsLoading(false);
    });
  }, [userId]);

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
              Todo #{id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={handleClose}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={completed ? 'has-text-success' : 'has-text-danger'}
              >
                {completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={user?.email}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
