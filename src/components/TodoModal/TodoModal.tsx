import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

interface TodoProps {
  post: Todo;
  onClick: () => void;
}

export const TodoModal: React.FC<TodoProps> = ({
  post,
  onClick = () => {},
}: TodoProps) => {
  const [user, setUser] = useState<User>({
    id: 0,
    name: '',
    email: '',
    phone: '',
  });

  const { id, title, completed, userId } = post;
  const { name, email } = user;

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getUser(userId)
      .then(findUser => setUser(findUser))
      .finally(() => setLoader(false));
  }, [userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loader ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onClick}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${email}`}>{name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
