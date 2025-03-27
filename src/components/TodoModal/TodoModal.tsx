import React, { memo } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface Props {
  todo: Todo;
  user: User;
  onClose: () => void;
  loading: boolean;
}

interface ModalHeaderProps {
  todoId: number;
  onClose: () => void;
}

const ModalHeader: React.FC<ModalHeaderProps> = memo(({ todoId, onClose }) => (
  <header className="modal-card-head">
    <div
      className="modal-card-title has-text-weight-medium"
      data-cy="modal-header"
    >
      Todo #{todoId}
    </div>

    <button
      type="button"
      className="delete"
      data-cy="modal-close"
      onClick={onClose}
    />
  </header>
));

ModalHeader.displayName = 'ModalHeader';

interface ModalContentProps {
  todo: Todo;
  user: User;
}

const ModalContent: React.FC<ModalContentProps> = memo(({ todo, user }) => (
  <div className="modal-card-body">
    <p className="block" data-cy="modal-title">
      {todo.title}
    </p>

    <p className="block" data-cy="modal-user">
      <strong
        className={todo.completed ? 'has-text-success' : 'has-text-danger'}
      >
        {todo.completed ? 'Done' : 'Planned'}
      </strong>

      {' by '}

      <a href={`mailto:${user.email}`}>{user.name}</a>
    </p>
  </div>
));

ModalContent.displayName = 'ModalContent';

const TodoModalComponent: React.FC<Props> = memo(
  ({ todo, user, onClose, loading }) => (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />

      {loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <ModalHeader todoId={todo.id} onClose={onClose} />
          <ModalContent todo={todo} user={user} />
        </div>
      )}
    </div>
  ),
);

TodoModalComponent.displayName = 'TodoModal';

export const TodoModal = TodoModalComponent;
