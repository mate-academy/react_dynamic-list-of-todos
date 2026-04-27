import { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import type { Todo } from '../../types/Todo';
import type { User } from '../../types/User';
// import { getUsers } from '../../servises/getUsers';

interface TodoModalProps {
  selected: Todo;
  closeModal: () => void;
}

export const TodoModal = ({ selected, closeModal }: TodoModalProps) => {
  const [loadingModal, setLoadingModal] = useState(true); // стан для лоадінг для модального вікна
  const [users, setUsers] = useState<User[]>([]); // стан для юзера
  const [error, setError] = useState<Error | null>(null); // стан для помилки завантаження

  const user = users.find(userItem => userItem.id === selected.userId);

  useEffect(() => {
    setLoadingModal(true);

    const loadUser = async () => {
      try {
        const response = await fetch(
          `https://mate-academy.github.io/react_dynamic-list-of-todos/api/users/${selected.userId}.json`,
        );

        const userItem = await response.json();

        // 👇 даємо React шанс відрендерити loader
        setTimeout(() => {
          setUsers([userItem]);
          setLoadingModal(false);
        }, 0);
      } catch (err) {
        setError(err as Error);
        setLoadingModal(false);
      }
    };

    loadUser();
  }, [selected.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loadingModal && <Loader />}
      {!loadingModal && error && <p>{error.message}</p>}
      {!loadingModal && !error && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selected.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selected.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selected.completed === false ? (
                <strong className="has-text-danger">Planned</strong>
              ) : (
                <strong className="has-text-success">Done</strong>
              )}

              {' by '}
              {user ? (
                <a href={`mailto:${user.email}`}>{user.name}</a>
              ) : (
                <span>Unknown user</span>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
