import React, { useEffect, useState } from 'react';

import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  closeTodo: () => void,
  selectedTodo: Todo | null,
};

export const TodoModal: React.FC<Props> = ({ selectedTodo, closeTodo }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    try {
      const currentUser = await getUser(selectedTodo?.userId || 0);

      setUser(currentUser);
    } catch {
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user
        ? (
          <Loader />
        )
        : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${selectedTodo?.id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={closeTodo}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {selectedTodo?.title}
              </p>
              {isError && (
                <h2 style={{ color: 'red' }}>
                  An error occured while user loading
                </h2>
              )}
              <p className="block" data-cy="modal-user">
                {selectedTodo?.completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>}

                {' by '}

                <a href={`mailto:${user.email}`}>
                  {user.name}
                </a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
