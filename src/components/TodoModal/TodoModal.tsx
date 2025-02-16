import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  todo: Todo;
  user: User;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({ todo, user, onClose }) => (
  <div className="modal is-active" data-cy="modal">
    <div className="modal-background" onClick={onClose} />

    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title has-text-weight-medium" data-cy="modal-header">
          Todo #{todo.id}
        </p>
        <button
          type="button"
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
          <strong className={todo.completed ? 'has-text-success' : 'has-text-danger'}>
            {todo.completed ? 'Done' : 'Planned'}
          </strong>
          {' by '}
          <a href={`mailto:${user.email}`}>{user.name}</a>
        </p>
      </section>
    </div>
  </div>
);
