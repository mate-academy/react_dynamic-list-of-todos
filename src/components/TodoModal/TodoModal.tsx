import React, { useState, useEffect } from 'react';

import { getUser } from '../../api';

import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

import { Loader } from '../Loader';

interface Props {
  todo: Todo;
  onClose: () => void;
}

export const TodoModal: React.FC<Props> = ({ todo, onClose }) => {
  const { id, title, completed, userId } = todo;

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    getUser(userId)
      .then(e => {
        setUser(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

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
              {`Todo #${id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              {completed ? (
                <strong className="has-text-danger">Done</strong>
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
