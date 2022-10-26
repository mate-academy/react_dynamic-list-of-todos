import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';

interface Props {
  currentTodo: Todo;
  deSelectTodo: () => void;
}

export const TodoModal: React.FC<Props> = ({ currentTodo, deSelectTodo }) => {
  const [user, setUser] = useState<User>();
  const [isUserLoading, setIsUserLoading] = useState(false);

  const loadUser = async () => {
    setIsUserLoading(true);
    const currentUser = await getUser(currentTodo.userId);

    setIsUserLoading(false);
    setUser(currentUser);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isUserLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => deSelectTodo()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              {currentTodo.completed
                ? (<strong className="has-text-success">Done</strong>)
                : (<strong className="has-text-danger">Planned</strong>)}
              {' by '}
              <a href={`mailto:${user?.email}`}>
                { user?.name }
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
