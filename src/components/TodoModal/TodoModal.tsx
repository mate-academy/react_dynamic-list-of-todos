import React, { useState, useEffect } from 'react';
import { getUser } from '../../api';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

 type Props = {
   todoModal: Todo | null;
   onCloseModalButtonClick: () => void;
 };

export const TodoModal: React.FC<Props> = ({
  todoModal,
  onCloseModalButtonClick,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserFromAPI = async () => {
      try {
        if (todoModal !== null) {
          setUser(await getUser(todoModal.userId));
        }
      } catch (error) {
        throw new Error('Error fetching user');
      }
    };

    fetchUserFromAPI();
  }, [todoModal]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!todoModal || !user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todoModal.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => onCloseModalButtonClick()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todoModal.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todoModal.completed ? (
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
