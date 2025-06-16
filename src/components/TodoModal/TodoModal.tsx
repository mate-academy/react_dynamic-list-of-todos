import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { TodoModalProps } from '../../types/Props';

export const TodoModal: React.FC<TodoModalProps> = ({
  selectedTodoId,
  todos,
  onClose,
}) => {
  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  useEffect(() => {
    if (selectedTodo) {
      setIsLoadingUser(true);
      setUser(null);

      getUser(selectedTodo.userId)
        .then(userData => {
          setUser(userData);
          setIsLoadingUser(false);
        })
        .catch(() => {
          setIsLoadingUser(false);
        });
    }
  }, [selectedTodo]);

  return (
    <div
      className={`modal ${selectedTodoId ? 'is-active' : ''}`}
      data-cy="modal"
    >
      <div className="modal-background" onClick={onClose} />

      {!selectedTodo || isLoadingUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={
                  selectedTodo.completed === true
                    ? 'has-text-success'
                    : 'has-text-danger'
                }
              >
                {selectedTodo.completed === true ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
