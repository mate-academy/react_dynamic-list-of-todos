import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
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
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Todo #{todo.id}</p>
          <button
            type="button"
            className="delete"
            aria-label="close"
            onClick={onClose}
          />
        </header>

        <section className="modal-card-body">
          {/* 1. Show Loader while fetching user details */}
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <p className="block">
                <strong>Title:</strong> {todo.title}
              </p>

              <p className="block">
                <strong>Status:</strong>{' '}
                {/* 2. Replaced ternary classes with classNames */}
                <span
                  className={classNames('tag', {
                    'is-success': todo.completed,
                    'is-danger': !todo.completed,
                  })}
                >
                  {todo.completed ? 'Done' : 'Planned'}
                </span>
              </p>

              {user && (
                <p className="block">
                  <strong>Assigned to:</strong> {user.name} ({user.email})
                </p>
              )}
            </>
          )}
        </section>

        <footer className="modal-card-foot">
          <button type="button" className="button" onClick={onClose}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};
