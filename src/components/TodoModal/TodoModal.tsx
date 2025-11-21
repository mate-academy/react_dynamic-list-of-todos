import React, { useEffect, useState } from 'react';
import { useTodoContext } from '../../context/TodoContext';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const { selectedTodo, setSelectedTodo } = useTodoContext();
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(() => {
    let mounted = true;
    const loadUser = async () => {
      if (!selectedTodo) {
        return;
      }

      setLoadingUser(true);
      setUser(null);
      try {
        const data = await getUser(selectedTodo.userId);

        if (mounted) {
          setUser(data);
        }
      } catch (err) {
        // ignore in tests
      } finally {
        if (mounted) {
          setLoadingUser(false);
        }
      }
    };

    loadUser();

    return () => {
      mounted = false;
    };
  }, [selectedTodo]);

  if (!selectedTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div
        className="modal-background"
        onClick={() => setSelectedTodo(null)}
      ></div>
      <div className="modal-content">
        <div className="box">
          <h2
            data-cy="modal-header"
            className="subtitle"
          >{`Todo #${selectedTodo.id}`}</h2>

          <h3 data-cy="modal-title" className="title is-5">
            {selectedTodo.title}
          </h3>

          {loadingUser ? (
            <div data-cy="loader">
              <i className="fas fa-spinner fa-spin" />
            </div>
          ) : (
            <p data-cy="modal-user" className="mt-2">
              {user
                ? `${selectedTodo.completed ? 'Done by' : 'Planned by'} ${user.name}`
                : ''}
            </p>
          )}

          <button
            data-cy="modal-close"
            className="button mt-4 is-danger"
            onClick={() => setSelectedTodo(null)}
          >
            Close
          </button>
        </div>
      </div>
      <button
        className="modal-close is-large"
        onClick={() => setSelectedTodo(null)}
      ></button>
    </div>
  );
};
