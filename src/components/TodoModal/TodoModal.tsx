import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getTodos, getUser, wait } from '../../api';

type Props = {
  modal: boolean;
  userId: number;
  numberUser: number;
  setModal: (value: boolean) => void;
};

export const TodoModal: React.FC<Props>
= ({
  modal,
  userId,
  setModal,
  numberUser,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    wait(100);
    if (modal && userId) {
      getUser(userId)
        .then(users => {
          getTodos().then(todos => {
            const targetTodo = todos.find(todo => todo.userId === users.id
            && todo.id === numberUser);

            if (targetTodo) {
              setUser({
                ...users,
                title: targetTodo.title,
                completed: targetTodo.completed,
              });
            }
          })
            .finally(() => setLoading(false));
        });
    }
  }, [modal, userId, user?.id, numberUser]);

  return (
    <div className={`modal ${modal ? 'is-active' : ''}`} data-cy="modal">
      <div
        className={modal ? 'modal-background' : ''}
      />
      {loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo# ${numberUser}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setModal(false)}
            />
          </header>

            {user && (
              <>
                <p className="block" data-cy="modal-title">
                  {user.title}
                </p>
                <p className="block" data-cy="modal-user">
                  <strong
                    className={
                      user.completed ? 'has-text-success' : 'has-text-danger'
                    }
                  >
                    {user.completed ? 'Done' : 'Planned'}
                  </strong>
                  {' by '}
                  <a href={`mailto:${user.email}`}>{user.name}</a>
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
