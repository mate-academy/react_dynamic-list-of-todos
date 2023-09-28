import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  todo: Todo;
  onTodoSelected: (todo: null) => void;
};

export const TodoModal: React.FC<Props> = ({ todo, onTodoSelected }) => {
  const [isLoadiang, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getUser(todo.userId)
      .then(setUser)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoadiang
        ? (<Loader />)
        : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #
                {todo.id}
              </div>

              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                aria-label="Close"
                onClick={() => onTodoSelected(null)}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {todo.completed
                  ? (
                    <strong className="has-text-success">Done</strong>
                  )
                  : (
                    <strong className="has-text-danger">Planned</strong>
                  )}
                {' by '}

                {user && (
                  <a href={`mailto:${user?.email}`}>
                    {user.name}
                  </a>
                )}
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
