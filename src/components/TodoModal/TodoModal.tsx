import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import classNames from 'classnames';

type TodoModalProps = {
  todo: Todo;
  onClose: () => void;
};

const TodoModal: React.FC<TodoModalProps> = ({ todo, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingModal, setIsLoadingModal] = useState<boolean>(true);

  useEffect(() => {
    setIsLoadingModal(true);
    getUser(todo.userId)
      .then((fetchedUser: User) => {
        setUser(fetchedUser);
      })
      .finally(() => {
        setIsLoadingModal(false);
      });
  }, [todo.userId]);

  if (isLoadingModal) {
    return (
      <div data-cy="modal" className="modal is-active">
        {' '}
        {/* Add data-cy for modal */}
        <Loader data-cy="modal-loader" />
      </div>
    );
  }

  return (
    <div className="modal is-active" data-cy="modal">
      {' '}
      {/* Modal container */}
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
            <a href={`mailto:${user?.email || ''}`} data-cy="user-email">
              {user?.name}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TodoModal;
