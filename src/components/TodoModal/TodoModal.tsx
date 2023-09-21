import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Loader } from '../Loader';

type TodoModalProps = {
  todo: Todo;
  handleClose: () => void;
};

export const TodoModal: React.FC<TodoModalProps> = ({ todo, handleClose }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser(todo.userId);

      setUser(userData);
    };

    fetchUser();
  }, [todo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {todo.id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleClose}
            >
              delete
            </button>
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className={`has-text-${todo.completed ? 'success' : 'danger'}`}>
                {todo.completed ? 'Done' : 'Planned'}
              </strong>
              {' by '}
              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
