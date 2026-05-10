import React from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import cn from 'classnames';

type Props = {
  post: Todo;
  user?: User;
  isLoading: boolean;
  onClose: (post: Todo | null) => void;
};
export const TodoModal: React.FC<Props> = ({
  post,
  user,
  isLoading,
  onClose,
}) => {
  return (
    <div className={cn(post ? 'modal is-active' : 'modal')} data-cy="modal">
      <div className="modal-background" data-cy="modal-background" />

      {isLoading || !user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{post.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              onClick={() => onClose(null)}
              className="delete"
              data-cy="modal-close"
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

              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
