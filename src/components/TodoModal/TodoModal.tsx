import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type TodoModalProps = {
  todo: Todo;
  setSelectedTodo: (todo: Todo | null) => void;
};

export const TodoModal = ({ todo, setSelectedTodo }: TodoModalProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const closeModal = () => {
    setSelectedTodo(null);
  };

  useEffect(() => {
    setIsLoading(true);

    getUser(todo.userId)
      .then(data => setUser(data))
      .catch(error => alert(error))
      .finally(() => setIsLoading(false));
  }, [todo.userId]);

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
              Todo #{todo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            {user && (
              <p className="block" data-cy="modal-user">
                {todo?.completed ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}

                {' by '}

                <a href="mailto:Sincere@april.biz">{user?.name}</a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
