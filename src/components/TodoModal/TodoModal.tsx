import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  setActiveTodo: React.Dispatch<React.SetStateAction<Todo | null>>,
  activeTodo: Todo,
};

export const TodoModal: React.FC<Props> = ({ setActiveTodo, activeTodo }) => {
  const [userIsLoading, setUserIsLoading] = useState<boolean>(false);
  const [activeUser, setActiveUser] = useState<User | null>(null);

  const loadUser = async () => {
    setUserIsLoading(true);
    const user = await getUser(activeTodo.userId);

    setActiveUser(user);
    setUserIsLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {userIsLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${activeTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setActiveTodo(null);
                setActiveUser(null);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {activeTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {
                activeTodo.completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>
              }

              {' by '}

              {activeUser && (
                <a href={`mailto:${activeUser.email}`}>
                  {activeUser.name}
                </a>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
