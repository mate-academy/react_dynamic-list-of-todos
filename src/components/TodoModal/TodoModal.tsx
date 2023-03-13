import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  hideTodo: () => void,
  selectedTodo: Todo | null,
};

export const TodoModal: React.FC<Props> = ({ hideTodo, selectedTodo }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await getUser(selectedTodo?.userId || 0);

        setUser(currentUser);
      } catch (error) {
        setIsError(true);
      }
    };

    loadUser();
  }, []);

  return (
    <div
      className="modal is-active"
      data-cy="modal"
    >
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo?.id}`}
            </div>

            <button
              type="button"
              className="delete"
              aria-label="Delete"
              data-cy="modal-close"
              onClick={hideTodo}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p
              className="block"
              data-cy="modal-user"
            >
              {selectedTodo?.completed
                ? (<strong className="has-text-success">Done</strong>)
                : (<strong className="has-text-danger">Planned</strong>)}

              {' by '}

              {isError ? (
                <span className="has-text-danger">The user not found</span>
              ) : (
                <a href={`mailto:${user.email}`}>
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
