import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getTodos, getUser } from '../../api';

type Props = {
  modal: boolean;
  userId: number;
  numberUser: number;
  setModal: (value: boolean) => void;
};

export const TodoModal: React.FC<Props> = ({
  modal,
  userId,
  setModal,
  numberUser,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { title, completed, email, name } = user || {
    title: '',
    completed: false,
    email: '',
    name: '',
  };

  useEffect(() => {
    setLoading(true);
    // wait(100);
    if (modal && userId) {
      getUser(userId).then(users => {
        getTodos()
          .then(todos => {
            const targetTodo = todos.find(
              todo => todo.userId === users.id && todo.id === numberUser,
            );

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
    <div className={cn('modal', { 'is-active': modal })} data-cy="modal">
      <div className={cn({ 'modal-background': modal })} />
      {loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${numberUser}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              aria-label="Modal close"
              onClick={() => setModal(false)}
            />
          </header>

          {user && (
            <>
              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {title}
                </p>
                <p className="block" data-cy="modal-user">
                  <strong
                    className={
                      completed ? 'has-text-success' : 'has-text-danger'
                    }
                  >
                    {completed ? 'Done' : 'Planned'}
                  </strong>
                  {' by '}
                  <a href={`mailto:${email}`}>{name}</a>
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
