import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  setIsModalSeen: (value: boolean) => void,
  isModalLoading: boolean,
  setLoadingModal: (value: boolean) => void,
};

export const TodoModal: React.FC<Props> = ({
  todo,
  setIsModalSeen: setShowModalBoolean,
  isModalLoading,
  setLoadingModal,
}) => {
  const defaultUser = {
    name: '',
    email: '',
    id: 0,
    phone: '',
  };

  const [user, setUser] = useState<User>(defaultUser);

  const {
    title,
    id,
    userId,
    completed,
  } = todo;
  const { name, email } = user;

  useEffect(() => {
    const getUserFromServer = async () => {
      setLoadingModal(true);
      const result = await getUser(userId);

      setUser(result);
      setLoadingModal(false);
    };

    getUserFromServer();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isModalLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
            </div>

            <button
              type="button"
              className="delete"
              aria-label="Close modal"
              data-cy="modal-close"
              onClick={() => {
                setShowModalBoolean(false);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {
                !completed
                  ? <strong className="has-text-danger">Planned</strong>
                  : <strong className="has-text-success">Done</strong>
              }
              {' by '}

              <a href={`mailto:${email}`}>
                {name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
