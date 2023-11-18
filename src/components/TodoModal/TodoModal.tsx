/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useContext } from 'react';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Loader } from '../Loader';
import { TodoContext } from '../TodoContext';

type Props = {
  activeTodo: Todo | null;
  setActiveTodo: (todo: Todo) => void;
};

export const TodoModal: React.FC<Props> = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { activeTodo, setActiveTodo } = useContext(TodoContext);

  useEffect(() => {
    setIsLoading(true);
    getUser(activeTodo.userId)
      .then(setUser)
      .finally(() => setIsLoading(false));
  }, [activeTodo?.userId]);

  const message = activeTodo.completed ? 'Done' : 'Planned';

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
              {`Todo #${activeTodo.id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setActiveTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {activeTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className={
                `has-text-${activeTodo.completed ? 'success' : 'danger'
                }`
              }
              >
                {message}
              </strong>

              {' by '}

              <a href={user?.email}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
