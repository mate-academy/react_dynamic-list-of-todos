import React from 'react';
import { Todo } from '../types/Todo';
import { User } from '../types/User';
import { Loader } from '../Loader';

interface Props {
  todo: Todo;
  user: User | null;
  isLoading: boolean;
  onClose: () => void;
}

export const TodoModal: React.FC<Props> = ({
  todo,
  user,
  isLoading,
  onClose,
}) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Todo Details</p>
          <button
            className="delete"
            aria-label="close"
            onClick={onClose}
            data-cy="modalClose"
            type="button"
          />
        </header>
        <section className="modal-card-body">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <p>
                <b>Title:</b> {todo.title}
              </p>
              <p>
                <b>Status:</b> {todo.completed ? 'Completed' : 'Active'}
              </p>
              {user && (
                <>
                  <p>
                    <b>User:</b> {user.name}
                  </p>
                  <p>
                    <b>Email:</b> {user.email}
                  </p>
                </>
              )}
            </>
          )}
        </section>
        <footer className="modal-card-foot">
          <button className="button" onClick={onClose} type="button">
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};
