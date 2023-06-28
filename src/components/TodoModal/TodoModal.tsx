import React, { memo, useEffect, useState } from 'react';
import { getUser } from '../../api/todos';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

interface TodoModalProps {
  todo: Todo;
  setSelectedTodoId: React.Dispatch<React.SetStateAction<number>>;
}

export const TodoModal: React.FC<TodoModalProps> = memo(({
  todo,
  setSelectedTodoId,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const {
    id,
    title,
    completed,
    userId,
  } = todo;

  useEffect(() => {
    getUser(userId)
      .then(userById => setUser(userById))
      .catch(error => new Error('Error fetching user:', error));
  }, []);

  const handleModalClose = () => {
    setUser(null);
    setSelectedTodoId(0);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user
        ? (
          <Loader />
        ) : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo#${id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={handleModalClose}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {title}
              </p>

              <p className="block" data-cy="modal-user">
                {completed
                  ? (
                    <strong className="has-text-success">Done</strong>
                  ) : (
                    <strong className="has-text-danger">Planned</strong>
                  )}

                {' by '}

                <a href="mailto:Sincere@april.biz">
                  {user.name}
                </a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
});
