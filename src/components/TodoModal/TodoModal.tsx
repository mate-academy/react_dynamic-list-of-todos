import React, { useContext, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { ActiveModalContext, ActiveTodoContext } from '../../util/Store';
import { getUser } from '../../api';
import { User } from '../../types/Types';

export const TodoModal: React.FC = () => {
  const { setIsActive } = useContext(ActiveModalContext);
  const { todo, setTodo } = useContext(ActiveTodoContext);
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser(todo?.userId as number)
      .then(setUser)
      .finally(() => {
        setLoading(false);
      });
  }, [todo?.userId]);

  function handleClick() {
    setIsActive(false);
    setTodo(null);
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => handleClick()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
