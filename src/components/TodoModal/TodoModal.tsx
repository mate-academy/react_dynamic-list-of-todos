import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  user: User | null;
  todo: Todo | null;
  closeModal: () => void;
};

export const TodoModal: React.FC<Props> = ({ user, todo, closeModal }) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{todo?.id || 'ID not available'}
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={closeModal}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {todo?.title || 'Title not available'}
          </p>

          <p className="block" data-cy="modal-user">
            {/* <strong className="has-text-success">Done</strong> */}
            <strong className="has-text-danger">Planned</strong>

            {' by '}

            <a href="mailto:Sincere@april.biz">
              {user?.name || 'User not available'}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
