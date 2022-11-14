import React, { useState, useEffect, useCallback } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  todo: Todo;
  setSelectedTodo: (value: null) => void;
};

export const TodoModal: React.FC<Props> = ({ todo, setSelectedTodo }) => {
  const [user, setUser] = useState<User | null>(null);
  const [catchErrors, setCatchErorrs] = useState(false);

  const loadUserFromServer = useCallback(async () => {
    try {
      const userFromServer = await getUser(todo.userId);

      setUser(userFromServer);
    } catch (error) {
      setCatchErorrs(true);
    }
  }, []);

  useEffect(() => {
    loadUserFromServer();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user && !catchErrors ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setSelectedTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo.completed
                ? (
                  <strong className="has-text-success">
                    Done
                  </strong>
                )
                : (
                  <strong className="has-text-danger">
                    Planned
                  </strong>
                )}
              {' by '}

              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
