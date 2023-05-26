import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  closeTodo: () => void,
  selectedTodo: Todo | null,
};

export const TodoModal: React.FC<Props> = ({ selectedTodo, closeTodo }) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchData = async () => {
    try {
      const currentUser = await getUser(selectedTodo?.userId || 0);

      setUser(currentUser);
    } catch (error) {
      if (error instanceof Error) {
        // eslint-disable-next-line no-console
        console.warn(error.message);
      } else {
        // eslint-disable-next-line no-console
        console.warn('Unexpected error');
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
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

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
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
      +
    </div>
  );
};
