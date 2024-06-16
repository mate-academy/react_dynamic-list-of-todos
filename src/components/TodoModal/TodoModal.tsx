import React, { useContext, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { UserIdContext, ActiveTodoContext } from '../../util/Store';
import { getUser } from '../../api';
import { Todo, User } from '../../types/Types';

export const TodoModal: React.FC = () => {
  const { activeUser, setActiveUser } = useContext(UserIdContext);
  const { todo, setTodo } = useContext(ActiveTodoContext);
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser(activeUser as number)
      .then(setUser)
      .finally(() => {
        setLoading(false);
      });
  }, [activeUser]);

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
              {`Todo #${todo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setActiveUser(0);
                setTodo({} as Todo);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo.completed ? (
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
