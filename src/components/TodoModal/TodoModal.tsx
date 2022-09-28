import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

interface Props {
  selectedTodo: Todo;
  setSelectedTodo: (val: null) => void
}

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  setSelectedTodo,
}) => {
  const {
    id,
    title,
    completed,
    userId,
  } = selectedTodo;

  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  const addUser = async () => {
    setUser(await getUser(userId));
    setIsLoading(false);
  };

  useEffect(() => {
    addUser();
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
              onClick={() => setSelectedTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={completed
                  ? 'has-text-success'
                  : 'has-text-danger'}
              >
                {completed
                  ? 'Done'
                  : 'Planned'}
              </strong>

              {' by '}

              <a href={user?.email}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
