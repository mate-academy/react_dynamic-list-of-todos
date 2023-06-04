import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

interface TodoModalProps {
  todo: Todo;
  setTodo: (todo: Todo | null) => void;
}

export const TodoModal: React.FC<TodoModalProps>
= ({ todo, setTodo }) => {
  const [fetchedUser, setFetchedUser] = useState<User | null>(null);
  const {
    id, title, completed, userId,
  } = todo;

  useEffect(() => {
    getUser(userId).then(userFound => setFetchedUser(userFound));
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {(fetchedUser && todo) ? (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setTodo(null)}
              aria-label="close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              <a href={`mailto:${fetchedUser.email}`}>{fetchedUser.name}</a>
            </p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
