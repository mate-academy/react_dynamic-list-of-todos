import React from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  task: Todo;
  onClose: () => void;
  user: User | null; // null поки грузиться
  loading: boolean;
};

export const TodoModal: React.FC<Props> = ({
  task,
  onClose,
  user,
  loading,
}) => (
  <div className="modal is-active" data-cy="modal">
    <div className="modal-background" />

    {loading || !user ? (
      <Loader />
    ) : (
      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            {`Todo #${task.id}`}
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
            {task.title}
          </p>

          <p className="block" data-cy="modal-user">
            {task.completed ? (
              <strong className="has-text-success">Done</strong>
            ) : (
              <strong className="has-text-danger">Planned</strong>
            )}
            {' by '}
            <a href={`mailto:${user.email}`}>{user.name}</a>
          </p>
        </div>
      </div>
    )}
  </div>
);
