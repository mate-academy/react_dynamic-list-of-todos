import { useEffect, useState } from 'react';
import { getUser } from '../../api';

import { Loader } from '../Loader';

import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  currentTodo: Todo | undefined;
  select: (Value: number) => void;
};

export const TodoModal: React.FC<Props> = ({ select, currentTodo }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (currentTodo) {
      getUser(currentTodo.userId)
        .then(selectedUser => {
          setUser(selectedUser);
          setIsLoading(true);
        });
    }
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => select(0)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo?.completed
                ? (
                  <strong className="has-text-success">Done</strong>
                )
                : (
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
