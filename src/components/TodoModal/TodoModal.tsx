import React from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface Props {
  todo: Todo;
  onClose: () => void;
  isLoadingUser: boolean;
  user: User | null;
}

export const TodoModal: React.FC<Props> = ({
  todo,
  onClose,
  isLoadingUser,
  user,
}) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />
      {isLoadingUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <p
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >{`Todo #${todo.id}`}</p>
            <button
              className="delete"
              data-cy="modal-close"
              onClick={onClose}
            />
          </header>
          <section className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>
            <p className="block" data-cy="modal-user">
              {user ? `Planned by ${user.name}` : 'Planned'}
            </p>
            {}
          </section>
        </div>
      )}
    </div>
  );
};
