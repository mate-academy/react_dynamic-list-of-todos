import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  activeTodo: Todo;
  setActiveTodo: (todo: Todo | null) => void;
  setShowModal: (value: boolean) => void;
};


export const TodoModal: React.FC<Props> = ({
  activeTodo,
  setActiveTodo,
  setShowModal,
}) => {
  const completed = activeTodo.completed;

  const [user, setUser] = useState<User | null>(null);
  const [modalLoading, setModalLoading] = useState(true);

  useEffect(() => {
    const delayTimer = setTimeout(() => setModalLoading(true), 300);

    getUser(activeTodo.userId)
      .then(setUser)
      .finally(() => {
        clearTimeout(delayTimer);
        setTimeout(() => setModalLoading(false), 500);
      });
  }, [activeTodo]);

  const handleClickButton = () => {
    setShowModal(false);
    setActiveTodo(null);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {!modalLoading && user ? (
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
              onClick={() => handleClickButton()}
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {activeTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={classNames({
                  'has-text-success': completed,
                  'has-text-danger': !completed,
                })}
              >
                {completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
