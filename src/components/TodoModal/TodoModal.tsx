import React from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { useFetch } from '../hooks/useFetch';
import { User } from '../../types/User';

type Props = {
  todo: Todo;
  onClose: () => void;
  fetchUser: () => Promise<User>;
};

export const TodoModal: React.FC<Props> = React.memo(
  ({ todo, onClose = () => {}, fetchUser }) => {
    const {
      data: user,
      loading,
      error,
    } = useFetch<User>(fetchUser, {} as User);

    return (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />

        {loading ? (
          <Loader />
        ) : (
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

                {!error && user && (
                  <a href={`mailto:${user.email}`}>{user.name}</a>
                )}
                {error && !user && <p>Could&apos;t fetch user</p>}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  },
);

TodoModal.displayName = 'TodoModal';
