import React from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  isOpen: boolean;
  todo: Todo | null;
  user: User | null;
  loading: boolean;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({
  isOpen,
  todo,
  user,
  loading,
  onClose,
}) => {
  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`} data-cy="modal">
      <div className="modal-background" onClick={onClose} />

      <div className="modal-card">
        {loading ? (
          <Loader />
        ) : (
          <>
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #{todo?.id}
              </div>

              <button
                onClick={onClose}
                type="button"
                className="delete"
                data-cy="modal-close"
                aria-label="close"
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                {todo?.completed ? (
                  <strong className="has-text-success">Completed</strong>
                ) : (
                  <strong className="has-text-danger">Not completed</strong>
                )}
                <br />
                {user && <a href={`mailto:${user.email}`}>{user.name}</a>}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
