import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  userId: number;
  post: Todo;
  setIsVisibleModal: (value: boolean) => void;
  setButtonId: (value: number) => void;
};

export const TodoModal: React.FC<Props> = ({
  userId,
  post,
  setIsVisibleModal,
  setButtonId,
}) => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = () => {
    setIsVisibleModal(false);
    setButtonId(0);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);

    getUser(userId).then(setUser);
  }, [userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${post.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleClick}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {post.title}
            </p>

            <p className="block" data-cy="modal-user">
              {post.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href="mailto:Sincere@april.biz">
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
