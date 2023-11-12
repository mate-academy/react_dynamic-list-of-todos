import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  handleCloseModal: () => void;
  setModalVisible: (con: boolean) => void;
  selectedTodo: Todo;
};

export const TodoModal: React.FC<Props> = (
  {
    handleCloseModal,
    setModalVisible,
    selectedTodo,
  },
) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (selectedTodo && selectedTodo.userId) {
      setLoadingUser(true);

      getUser(selectedTodo.userId)
        .then((userData) => {
          setUser(userData);
        })
        .catch((error) => {
          throw new Error(error);
        })
        .finally(() => {
          timeout = setTimeout(() => {
            setLoadingUser(false);
            setModalVisible(true);
          }, 500);
        });
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [selectedTodo, setLoadingUser, setModalVisible]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loadingUser ? (
        <Loader />
      ) : (
        <div>
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                <span>
                  {`Todo #${selectedTodo.id}`}
                </span>
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={handleCloseModal}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {selectedTodo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {selectedTodo.completed === true
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>}

                {' by '}

                <a href="mailto:Sincere@april.biz" data-cy="todo">
                  {user?.name}
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
