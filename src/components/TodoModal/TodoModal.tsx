import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  seletedTodo: Todo,
  onModalClose: (value: null) => void;
};

export const TodoModal: React.FC<Props> = ({ seletedTodo, onModalClose }) => {
  const {
    userId,
    title,
    completed,
    id,
  } = seletedTodo;
  const [user, setUser] = useState<User | null>(null);
  const [hasUserError, setHasUserError] = useState(false);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const userByIdFromServer = await getUser(userId);

        setUser(userByIdFromServer);
        setHasUserError(false);
      } catch (error) {
        setHasUserError(true);
      } finally {
        setisLoading(false);
      }
    };

    fetchUserById();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && <Loader />}
      {!hasUserError && (
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
              onClick={() => onModalClose(null)}
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

              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
