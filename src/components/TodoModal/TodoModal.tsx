import React from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  user: User | null;
  todo: Todo | null;
  reset: () => void;
};

export const TodoModal: React.FC<Props> = ({ user, todo, reset }) => {
  const { name, email } = user || {};
  const { id, title, completed } = todo || {};

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {user === null ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={reset}
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

              <a href={`mailto:${email}`}>{name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
