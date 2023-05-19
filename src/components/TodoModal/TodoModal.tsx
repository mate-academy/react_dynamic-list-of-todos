import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  todo: Todo,
  closeDetails: () => void,
};

export const TodoModal: React.FC<Props> = ({ todo, closeDetails }) => {
  const {
    id,
    userId,
    completed,
    title,
  } = todo;
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>({
    email: '',
    id: 0,
    name: '',
    phone: '',
  });

  useEffect(() => {
    getUser(userId)
      .then(user => {
        setSelectedUser(user);
        setIsLoaded(true);
      });
  }, [userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!isLoaded ? (
        <Loader />
      )
        : (
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
                onClick={closeDetails}
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
                {' by '}

                <a href={`mailto: ${selectedUser.email}`}>
                  {selectedUser.name}
                </a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
