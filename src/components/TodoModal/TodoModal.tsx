import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

interface TodoModalProps {
  selectedTodo: Todo;
  setSelectedTodo: (value: Todo | null) => void;
}

export const TodoModal: React.FC<TodoModalProps> = ({
  selectedTodo,
  setSelectedTodo,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const {
    id, title, completed, userId,
  } = selectedTodo;

  useEffect(() => {
    getUser(userId)
      .then((user) => setCurrentUser(user));
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!currentUser || !selectedTodo ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setSelectedTodo(null);
              }}
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

              <a href={`mailto:${currentUser.email}`}>{currentUser.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
