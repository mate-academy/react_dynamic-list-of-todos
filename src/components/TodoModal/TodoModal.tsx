/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  selectedTodo: Todo | null,
  closeTodo: () => void,
};

export const TodoModal: React.FC<Props> = ({ selectedTodo, closeTodo }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const user = await getUser(selectedTodo?.userId || 0);

      setCurrentUser(user);
    } catch (error) {
      if (error instanceof Error) {
        console.warn(error.message);
      } else {
        console.warn('Unexpected error');
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!currentUser ? (
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
              {`${selectedTodo?.title}`}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              {selectedTodo?.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              <a href={`mailto:${currentUser.email}`}>
                {`${currentUser.name}`}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
