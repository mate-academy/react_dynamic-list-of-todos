import React from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo | null;
  clearSelectedTodo: () => void;
}

export const ErrorModal: React.FC<Props> = ({ todo, clearSelectedTodo }) => (
  <div
    className={classNames(
      'modal',
      {
        'is-active': todo,
      },
    )}
    data-cy="modal"
  >
    <div className="modal-background" />
    <div className="modal-card">
      <header className="modal-card-head">
        <div
          className="modal-card-title has-text-weight-medium"
          data-cy="modal-header"
        >
          Error
        </div>

        <button
          type="button"
          aria-label="Close modal"
          className="delete"
          data-cy="modal-close"
          onClick={clearSelectedTodo}
        />
      </header>

      <div className="modal-card-body">
        <p className="block" data-cy="modal-title">
          Server is unavailable, try again later...
        </p>
      </div>
    </div>
  </div>
);
