import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  setSelectedPost: (selectedPerson: Todo | null) => void,
  selectedPost: Todo | null,
};

export const TodoModal: React.FC<Props> = ({
  setSelectedPost,
  selectedPost,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    if (selectedPost) {
      getUser(selectedPost.userId)
        .then(user => setSelectedUser(user))
        .catch(error => setErrorMessage(error))
        .finally(() => setIsLoading(false));
    }
  }, [selectedPost]);

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
              {`Todo #${selectedPost?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setSelectedPost(null)}
            />
          </header>

          <div className="modal-card-body">
            {errorMessage ? (
              <p className="block">
                {errorMessage}
              </p>
            ) : (
              <div>
                <p className="block" data-cy="modal-title">
                  {selectedPost?.title}
                </p>

                <p className="block" data-cy="modal-user">
                  <strong className={cn({
                    'has-text-success': selectedPost?.completed,
                    'has-text-danger': !selectedPost?.completed,
                  })}
                  >
                    {selectedPost?.completed ? 'Done' : 'Planned'}
                  </strong>

                  {' by '}

                  <a href={`mailto:${selectedUser?.email}`}>
                    {selectedUser?.name}
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
