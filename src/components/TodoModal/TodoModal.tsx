import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import classNames from 'classnames';

type Props = {
  setOpenedTodo: (todo: Todo | null) => void;
  setShowModal: (showModal: boolean) => void;
  openedTodo: Todo | null;
};

export const TodoModal: React.FC<Props> = ({
  setOpenedTodo,
  setShowModal,
  openedTodo,
}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!openedTodo) {
      return;
    }

    getUser(openedTodo.userId).then(userInfo => {
      setUsername(userInfo.name);
      setEmail(userInfo.email);
    });
  }, [openedTodo]);

  const handleModalClose = () => {
    setOpenedTodo(null);
    setShowModal(false);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {username === '' || email === '' ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{openedTodo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleModalClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {openedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={classNames({
                  'has-text-success': openedTodo?.completed,
                  'has-text-danger': !openedTodo?.completed,
                })}
              >
                {openedTodo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${email}`}>{username}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
