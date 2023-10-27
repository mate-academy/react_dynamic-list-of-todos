import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  isSelected: Todo;
  setIsSelected: (value: Todo | null) => void;
};

export const TodoModal: React.FC<Props> = ({ isSelected, setIsSelected }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUser(isSelected.userId)
      .then(item => setUser(item))
      .catch(() => {
        throw new Error('Something wron with a user');
      });
  }, [isSelected.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${isSelected.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setIsSelected(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {isSelected.title}
            </p>

            <p className="block" data-cy="modal-user">
              {isSelected.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}

              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
