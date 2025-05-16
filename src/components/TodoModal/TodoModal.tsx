import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

interface TodoModalProps {
  todo: Todo;
  users: Record<number, User>;
  setUsers: React.Dispatch<React.SetStateAction<Record<number, User>>>;
  onClose: () => void;
}

export const TodoModal: React.FC<TodoModalProps> = ({
  todo,
  users,
  setUsers,
  onClose,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [modalLoading, setModalLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(
      `https://mate-academy.github.io/react_dynamic-list-of-todos/api/users/${todo.userId}.json`,
    )
      .then(res => res.json())
      .then(fetchedUser => {
        setUsers(prevUsers => ({
          ...prevUsers,
          [fetchedUser.id]: fetchedUser,
        }));
        setUser(fetchedUser);
      })
      // eslint-disable-next-line no-console
      .catch(error => console.error('Error fetching user:', error))
      .finally(() => setTimeout(() => setModalLoading(false), 300));
  }, [todo.userId, users, setUsers, setModalLoading]);

  if (!user) {
    return null; // don't show modal until user is fetched
  }

  return (
    <div className="modal is-active" data-cy="modal">
      {modalLoading ? (
        <Loader loading={modalLoading} />
      ) : (
        <>
          <div className="modal-background" />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title" data-cy="modal-header">
                Todo #{todo.id}
              </p>
              <button
                className="delete"
                onClick={onClose}
                aria-label="close"
                data-cy="modal-close"
              />
            </header>

            <div className="modal-card-body">
              <>
                <p className="block" data-cy="modal-title">
                  {todo.title}
                </p>
                {user && (
                  <p className="block" data-cy="modal-user">
                    {todo.completed ? (
                      <strong className="has-text-success">Done</strong>
                    ) : (
                      <strong className="has-text-danger">Planned</strong>
                    )}
                    {' by '}
                    <a href={`mailto:${user.email}`}>{user.name}</a>
                  </p>
                )}
              </>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
