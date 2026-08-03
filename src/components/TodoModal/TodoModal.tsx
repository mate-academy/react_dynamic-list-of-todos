import React from 'react';

import classNames from 'classnames';

import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

import { Loader } from '../Loader';

type Props = {
  todo: Todo;
  user: User | null;
  isLoading: boolean;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({
  todo,
  user,
  isLoading,
  onClose,
}) => {
  /* eslint-disable no-console */
  console.log('render TodoModal');

  if (isLoading) {
    return (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />
        <Loader />
      </div>
    );
  }

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
            <strong
              className={classNames({
                'has-text-danger': !todo.completed,
                'has-text-success': todo.completed,
              })}
            >
              {todo.completed ? 'Done' : 'Planned'}
            </strong>

            {' by '}

            <a href={`mailto:${user?.email}`}>{user?.name}</a>
          </p>
        </div>
      </div>
    </div>
  );
};
