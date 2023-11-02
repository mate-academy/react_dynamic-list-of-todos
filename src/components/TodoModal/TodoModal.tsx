import React, { useState, useEffect } from 'react';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api/api';

type Props = {
  todos: Todo[],
  setModal: (val: boolean) => void,
  id: number,
  setId: (val: number) => void,
  loader: boolean,
  setLoader: (val: boolean) => void,
  userId: number,
  onError: (val: string) => void,
};

export const TodoModal: React.FC<Props> = ({
  todos,
  setModal,
  id,
  setId,
  loader,
  setLoader,
  userId,
  onError,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(userId)
      .then((userData) => {
        setUser(userData);
      })
      .catch((error) => onError(error))
      .finally(() => setLoader(false));
  }, [setLoader, userId, onError]);

  const handleCloseModal = () => {
    setModal(false);
    setId(0);
  };

  const getTodoById = (todoId: number) => {
    return todos.find(todo => todo.id === todoId);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {loader ? <Loader /> : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
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
              {getTodoById(id)?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {getTodoById(id)?.completed === false ? (
                <strong className="has-text-danger">Planned</strong>
              ) : (
                <strong className="has-text-success">Done</strong>
              )}

              {' by '}

              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
