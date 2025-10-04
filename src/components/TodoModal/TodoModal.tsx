import * as React from 'react';
import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

interface Props {
  todo: Todo | null;
  setActiveId: React.Dispatch<React.SetStateAction<number | null>>;
  onClose: () => void;
}

export const TodoModal: React.FC<Props> = ({ todo, setActiveId, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [todoDetails, setTodoDetails] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!todo) {
      setTodoDetails(null);
      setUser(null);

      return;
    }

    setLoading(true);

    const timer = setTimeout(() => {
      setTodoDetails(todo);

      getUser(todo.userId)
        .then(setUser)
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(timer);
  }, [todo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />

      {loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div className="modal-card-title" data-cy="modal-header">
              Todo #{todoDetails?.id}
            </div>
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                onClose();
                setActiveId(null);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todoDetails?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={
                  todoDetails?.completed
                    ? 'has-text-success'
                    : 'has-text-danger'
                }
              >
                {todoDetails?.completed ? 'Done' : 'Planned'}
              </strong>{' '}
              by <a href={user?.email}>{user ? `${user.name}` : 'Невідомо'}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
