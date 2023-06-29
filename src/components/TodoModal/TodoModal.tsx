import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';

interface Props {
  userId: number | null,
  selectedTodo: Todo | null,
  setIsTodoInfoRequested: (arg: boolean) => void,
}

export const TodoModal: React.FC<Props> = ({
  userId,
  selectedTodo,
  setIsTodoInfoRequested,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userUploaded, setUserUploaded] = useState(false);

  const loadUser = async (id: number) => {
    try {
      const loadedUser = await getUser(id);

      setUser(loadedUser);
      setUserUploaded(true);
    } catch (error) {
      // setIsLoadingError(true)
    }
  };

  useEffect(() => {
    if (userId) {
      loadUser(userId);
    }
  }, [userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!userUploaded || !selectedTodo || !user ? (
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
                setIsTodoInfoRequested(false);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              {selectedTodo.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              <a href="mailto:Sincere@april.biz">
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
