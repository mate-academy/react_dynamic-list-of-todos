import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';

type Props = {
  setSelectedPost: (selectedPost: Todo | null) => void;
  selectedPost: Todo | null;
};

export const TodoModal: React.FC<Props> = ({
  setSelectedPost,
  selectedPost,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isCompleted = !!selectedPost?.completed;

  useEffect(() => {
    getUser(selectedPost?.userId || 0)
      .then(user => {
        setSelectedUser(user);
        setIsLoading(false);
      })
      .catch(error => {
        throw new Error(error);
      });
  }, [selectedPost?.userId]);

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
              Todo #
              {selectedPost?.id}
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
            <p className="block" data-cy="modal-title">
              {selectedPost?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className={cn({
                'has-text-success': isCompleted,
                'has-text-danger': !isCompleted,
              })}
              >
                {
                  isCompleted
                    ? 'Done'
                    : 'Planned'
                }
              </strong>

              {' by '}

              <a href={`mailto:${selectedUser?.email}}`}>
                {selectedUser?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
