import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

interface Props {
  selectedTodo: Todo | null;
  setSelectedTodo: (arg: Todo | null) => void;
}

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  setSelectedTodo,
}) => {
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const {
    id,
    userId,
    completed,
    title
  } = selectedTodo;

  const {
    email,
    name,
  } = user;

  useEffect(() => {
    getUser(userId)
      .then(setUser)
      .finally(() => setIsUserLoaded(true));
  }, [userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!isUserLoaded ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setSelectedTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={cn({
                  "has-text-danger": !selectedTodo?.completed,
                  "has-text-success": selectedTodo?.completed,
                })}
              >
                {completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}
              {}
              <a href={`mailto:${email}`}>{name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
