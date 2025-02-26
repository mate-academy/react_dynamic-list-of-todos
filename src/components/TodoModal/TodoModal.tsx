import { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';

interface TodoModalProps {
  todo: Todo;
  closeModal: () => void;
}

interface User {
  id: number;
  name: string;
  email: string;
}

export const TodoModal: React.FC<TodoModalProps> = ({ todo, closeModal }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!todo.userId) {
      return;
    }

    setLoading(true);
    getUser(todo.userId)
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [todo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={closeModal} />
      <div className="modal-card">
        <header className="modal-card-head" data-cy="modal-header">
          <div className="modal-card-title">Todo #{todo.id}</div>
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={closeModal}
          />
        </header>

        <div className="modal-card-body">
          {loading ? (
            <Loader data-cy="loader" />
          ) : (
            <>
              <p className="block">{todo.title}</p>
              <p
                className={
                  todo.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {todo.completed ? 'Done' : 'Planned'}
              </p>
              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
