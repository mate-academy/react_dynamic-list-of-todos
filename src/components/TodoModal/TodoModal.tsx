import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader/Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';
type Props = {
  todo: Todo;
  onClose: () => void;
};
export const TodoModal: React.FC<Props> = ({ todo, onClose }) => {
  const [modalError, setModalError] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const findInfo = async () => {
    setModalError(false);
    setLoading(true);
    try {
      const currentUser = await getUser(todo.userId);
      if (currentUser) {
        setUser(currentUser);
      } else {
        setModalError(true);
      }
    } catch {
      setModalError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    findInfo();
  }, [todo]);
  return (
    <div
      className={`modal ${modalError || loading || user ? 'modal is-active' : ''}`}
      data-cy="modal"
    >
      <div className="modal-background" />
      {loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo.id}`}
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
              {todo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              {user ? (
                <a href={`mailto:${user.email}`}>{user.name}</a>
              ) : modalError ? (
                <span>User not found</span>
              ) : (
                <span>Loading user...</span>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

