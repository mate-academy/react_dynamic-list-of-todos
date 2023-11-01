import React, { useState } from 'react';
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

  if (selectedPost) {
    getUser(selectedPost.userId)
      .then(user => setSelectedUser(user));
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!selectedUser ? (
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
            <p className="block" data-cy="modal-title">
              {selectedPost?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className="has-text-danger">
                {selectedPost?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${selectedUser?.email}`}>
                {selectedUser?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
