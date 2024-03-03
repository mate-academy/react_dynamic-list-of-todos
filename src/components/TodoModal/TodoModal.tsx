import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

interface Props {
  activeTodo: Todo;
  setActiveTodo: Dispatch<SetStateAction<Todo | undefined>>;
}

export const TodoModal: React.FC<Props> = ({ activeTodo, setActiveTodo }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    getUser(activeTodo.userId).then(data => {
      setUser(data);
    });
  }, []);

  const handleClick = () => {
    setActiveTodo(undefined);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{activeTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleClick}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {activeTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {activeTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}

              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
