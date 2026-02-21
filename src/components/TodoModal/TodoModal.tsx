import React from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import classNames from 'classnames';
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
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={classNames('modal', { 'is-active': isOpen })}
      data-cy="modal"
    >
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
                {user && (
                  <>
                    <strong
                      className={
                        todo?.completed ? 'has-text-success' : 'has-text-danger'
                      }
                    >
                      {todo?.completed ? 'Done' : 'Planned'}
                    </strong>
                    {' by '}
                    <a href={`mailto:${user.email}`}>{user.name}</a>
                  </>
                )}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
