import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Maybe } from '../../types/Maybe';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

interface Props {
  onClose: (selectedTodo: Maybe<Todo>) => void;
  selectedTodo: Todo;
}

export const TodoModal: React.FC<Props> = (props) => {
  const {
    onClose,
    selectedTodo: {
      id,
      title,
      completed,
      userId,
    },
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<Maybe<User>>(null);

  useEffect(() => {
    setIsLoading(true);
    getUser(userId)
      .then((userFromServer) => {
        setUser(userFromServer);
        setIsLoading(false);
      });
  }, []);

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
              {`Todo #${id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => onClose(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              { completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

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
