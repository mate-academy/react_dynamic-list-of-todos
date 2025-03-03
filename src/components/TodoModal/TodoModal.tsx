import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { title } from 'process';
import { getUser } from '../../api';
import { TodoModalProps } from '../../types/TodoModalProps';

export const TodoModal: React.FC<TodoModalProps> = ({
  postId,
  resetId,
  list,
}) => {
  const defaultUser: User = {
    id: 0,
    name: 'name',
    email: 'email',
    phone: 'unknown',
  };

  const [user, setUser] = useState<User>(defaultUser);
  const [loading, setLoading] = useState(true);

  const defaulPost: Todo = {
    id: 0,
    title: title,
    completed: false,
    userId: 0,
  };

  const post = list.find(item => item.id === postId) || defaulPost;

  useEffect(() => {
    getUser(post.userId)
      .then(setUser)
      .finally(() => setLoading(false));
  }, [post.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading ? (
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
              className="delete"
              data-cy="modal-close"
              onClick={() => resetId(0)}
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
