import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface Props {
  todo: Todo;
  user: User;
  onClose: () => void;
}

export const TodoModal: React.FC<Props> = ({ todo, user, onClose }) => (
  <div data-cy="modal" className="modal">
    <button data-cy="modal-close" onClick={onClose}>
      x
    </button>
    <h2 data-cy="modal-header">{`Todo #${todo.id}`}</h2>
    <h3 data-cy="modal-title">{todo.title}</h3>
    <p data-cy="modal-user">
      {todo.completed ? `Done by ${user.name}` : `Planned by ${user.name}`}
    </p>
    <p>Email: {user.email}</p>
  </div>
);
