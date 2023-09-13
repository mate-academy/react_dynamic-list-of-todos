import React, { useContext, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { TodoContext } from '../TodoContext';

export const TodoModal: React.FC = () => {
  const [showedUser, setShowedUser] = useState<User | null>(null);
  const { showedTodo, setShowedTodo } = useContext(TodoContext);

  useEffect(() => {
    if (showedTodo?.userId) {
      getUser(showedTodo.userId).then(setShowedUser);
    }
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!showedUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${showedTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setShowedTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {showedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={showedTodo?.completed
                  ? 'has-text-success' : 'has-text-danger'}
              >
                {showedTodo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${showedUser.email}`}>
                {showedUser.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
