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
  userId: number;
};

export const TodoModal: React.FC<Props> = ({
  isCheck,
  setCheckId,
  setIsCheck,
  filteredTodos,
  checkId,
  userId,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const selectedTodo = filteredTodos.find((todo) => todo.id === checkId);

  useEffect(() => {
    if (isCheck && checkId > 0) {
      getUser(userId)
        .then((userData) => {
          setUser(userData);
        });
    }
  }, [userId, checkId, isCheck]);

  const handleModalClose = () => {
    setUser(null);
    setIsCheck(false);
    setCheckId(0);
  };

  return isCheck ? (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {user === null ? (
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
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  ) : null;
};
