import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  isCheck: boolean;
  setCheckId: React.Dispatch<React.SetStateAction<number>>;
  setIsCheck: React.Dispatch<React.SetStateAction<boolean>>;
  filteredTodos: Todo[];
  checkId: number;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  userId: number;
};

export const TodoModal: React.FC<Props> = ({
  isCheck,
  setCheckId,
  setIsCheck,
  filteredTodos,
  checkId,
  loading,
  setLoading,
  userId,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const selectedTodo = filteredTodos.find((todo) => todo.id === checkId);

  useEffect(() => {
    if (isCheck && checkId > 0) {
      setLoading(true);
      getUser(userId)
        .then((userData) => {
          setUser(userData);
        })
        .finally(() => setLoading(false));
    }
  }, [userId, checkId, isCheck, setLoading]);

  const handleModalClose = () => {
    setUser(null);
    setIsCheck(false);
    setCheckId(0);
  };

  return user !== null ? (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading && checkId ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {checkId}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleModalClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={user.email}>
                { user !== null && user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  ) : null;
};
