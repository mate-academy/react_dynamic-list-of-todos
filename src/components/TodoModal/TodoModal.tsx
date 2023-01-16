import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';

type Props = {
  todo: Todo;
  onClick: (todo: null) => void;
};

export const TodoModal: React.FC<Props> = ({ todo, onClick }) => {
  const [user, setUser] = useState({
    id: 0,
    name: '',
    email: '',
    phone: '',
  });

  const {
    id,
    completed,
    title,
    userId,
  } = todo;

  const { email, name } = user;

  useEffect(() => {
    if (userId > 0) {
      getUser(userId).then(setUser);
    }
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!name ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                onClick(null);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              &nbsp;by&nbsp;

              <a href={`mailto:${email}`}>
                {name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
