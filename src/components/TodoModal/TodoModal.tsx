import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { User } from '../../types/User';

type Props = {
  todo: Todo | null;
  setIsTodoModal: (b: boolean) => void;
};

export const TodoModal = ({ todo, setIsTodoModal }: Props) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    fetch('api/users.json')
      .then(res => res.json())
      .then(usersFromServer => {
        const thisUser = usersFromServer.find(
          (u: User) => u.id === todo?.userId,
        );

        setUser(thisUser);
      })
      .finally(() => setTimeout(() => setLoading(false), 200));
  }, [todo]);

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
              onClick={() => setIsTodoModal(false)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={classNames(
                  todo?.completed ? 'has-text-success' : 'has-text-danger',
                )}
              >
                {todo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
