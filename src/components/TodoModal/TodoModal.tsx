import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface TodoModalProps {
  todo: Todo;
  user: User;
  onClose: () => void;
}

export const TodoModal: React.FC<TodoModalProps> = ({
  todo,
  user,
  onClose,
}) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{`Todo #${todo.id}`}</p>
          <button
            type="button"
            className="delete"
            aria-label="close"
            onClick={onClose}
            data-cy="modal-close"
          />
        </header>
        <section className="modal-card-body">
          <p data-cy="modal-title">{todo.title}</p>
          <p data-cy="modal-user">
            <strong
              className={
                todo.completed ? 'has-text-success' : 'has-text-danger'
              }
            >
              {todo.completed ? 'Completed' : 'Planned'}
            </strong>
            {` by `}
            <a href={`mailto:${user.email}`}>{user.name}</a>
          </p>
        </section>
      </div>
    </div>
  );
};
