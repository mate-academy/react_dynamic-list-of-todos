import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

interface Props {
  selectedTodo: Todo;
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  userId: User['id'];
  setUserId: React.Dispatch<React.SetStateAction<number>>;
}

export const TodoModal: React.FC<Props>
= ({
  selectedTodo,
  setSelectedTodo,
  userId,
  setUserId,
}) => {
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [user, selectUser] = useState<User | null>(null);

  const { title, completed } = selectedTodo;

  const loadData = useCallback(() => {
    setIsloading(true);

    getUser(userId)
      .then(userFromServer => selectUser(userFromServer))
      .finally(() => setIsloading(false));
  }, []);

  useEffect(() => {
    if (userId !== null) {
      loadData();
    }
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setSelectedTodo(null);
                setUserId(0);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {
                completed
                  ? (<strong className="has-text-success">Done</strong>)
                  : (<strong className="has-text-danger">Planned</strong>)
              }

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
