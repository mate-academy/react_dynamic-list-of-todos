import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  todo: Todo | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({
  todo,
  user,
  isLoading,
  error,
  onClose,
}) => {
  if (!todo) {
    return null;
  }

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Todo Details</p>
          <button
            type="button"
            className="delete"
            aria-label="close"
            onClick={onClose}
          />
        </header>

        <section className="modal-card-body">
          <h2 className="title is-5">{todo.title}</h2>
          <p>
            Status: <strong>{todo.completed ? 'Completed' : 'Pending'}</strong>
          </p>

          <hr />

          {isLoading && <Loader />}

          {!isLoading && user && (
            <div>
              <p>
                <strong>User:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
            </div>
          )}

          {!isLoading && !user && <p className="has-text-danger">{error}</p>}
        </section>
      </div>
    </div>
  );
};
