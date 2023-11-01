import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

interface TodoModalProps {
  todo: Todo;
  onClose: () => void;
  user: User;
  loadingUser: boolean;
}

export const TodoModal: React.FC<TodoModalProps> = ({
  todo: { id, title, completed },
  onClose,
  user: { name, email },
  loadingUser,
}) => {
  if (loadingUser) {
    return <Loader data-cy="loader" />;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <div className="modal-card-title" data-cy="modal-header">{`Todo #${id}`}</div>
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          />
        </header>
        <div className="modal-card-body">
          <>
            <p className="block" data-cy="modal-title">{title}</p>
            <p data-cy="modal-user">
              {completed ? `Done by ${name}` : `Planned by ${name}`}
            </p>
            <p>{email}</p>
          </>
        </div>
      </div>
    </div>
  );
};
