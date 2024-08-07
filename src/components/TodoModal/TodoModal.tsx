import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  closePost: (value: null) => void;
  post: Todo | null;
};

export const TodoModal: React.FC<Props> = ({ closePost, post }) => {
  const [selectUser, setSelectUser] = useState<User | null>(null);

  const heandleClose = () => {
    setSelectUser(null);
    closePost(null);
  };

  useEffect(() => {
    if (post && post.userId) {
      getUser(post.userId).then(res => {
        setSelectUser(res);
      });
    }
  }, [post]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!selectUser?.email ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{post?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={heandleClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {post?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {post?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={selectUser ? `mailto${selectUser.email}` : ''}>
                {selectUser.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
