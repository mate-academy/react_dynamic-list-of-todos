import { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import type { Todo } from '../../types/Todo';
import type { User } from '../../types/User';
import { getUsers } from '../../servises/getUsers';

interface TodoModalProps {
  selected: Todo;
  closeModal: () => void;
}

export const TodoModal = ({ selected, closeModal }: TodoModalProps) => {
  const [loadingModal, setLoadingModal] = useState(true); // стан для лоадінг для модального вікна
  const [users, setUsers] = useState<User[]>([]); // стан для юзера
  const [error, setError] = useState<Error | null>(null); // стан для помилки завантаження

  const user = users.find(userItem => userItem.id === selected.userId);

  // useEffect(() => {
  //   setLoadingModal(true);
  //   getUsers()
  //     .then(data => {
  //       setLoadingModal(false);
  //       setUsers(data);
  //     })
  //     .catch(err => {
  //       setLoadingModal(false);
  //       setError(err);
  //     });
  // }, []);

  useEffect(() => {
    setLoadingModal(true);

    getUsers()
      .then(data => {
        // 👇 залишаємо тільки потрібного юзера
        const filteredUser = data.filter(
          userItem => userItem.id === selected.userId,
        );

        setUsers(filteredUser);
        setLoadingModal(false);
      })
      .catch(err => {
        setError(err);
        setLoadingModal(false);
      });
  }, [selected]);

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
