import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

interface ModalProps {
  todo: Todo;
  users: User[];
  onClose: () => void;
  loading: boolean;
}

export const TodoModal: React.FC<ModalProps> = ({ todo, users, onClose, loading }) => {


  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{todo.id}
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
          {loading ? (
            <Loader />
          ) : (
            <>
              <p className="block" data-cy="modal-title">
                {todo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {todo.completed ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}

                {' by '}

                {users.length > 0 ? (
                  <a href={`mailto:${users[0].email}`}>{users[0].name}</a>
                ) : (
                  'Unknown User'
                )}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
