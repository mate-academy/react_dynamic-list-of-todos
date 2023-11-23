import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  selectedTodo: Todo;
  onSelectedTodo?: (todo: Todo | null) => void;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  onSelectedTodo = () => { },
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    id, title, completed, userId,
  }: Todo = selectedTodo;

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      getUser(userId)
        .then(setUser)
        // .catch((err) => console.error(err))
        .finally(() => {
          setIsLoading(false);
        });
    }, 500);
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
              {`Todo #${id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => onSelectedTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className={`has-text-${completed ? 'success' : 'danger'}`}>
                {completed ? 'Done' : 'Planned'}
              </strong>

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
