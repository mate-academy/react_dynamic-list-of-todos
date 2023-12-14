import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  selectTodo: Todo,
  setSelectTodo: (todo: Todo | null) => void,
};

export const TodoModal: React.FC<Props> = ({
  selectTodo,
  setSelectTodo,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getUser(selectTodo.userId)
      .then(userData => setUser(userData))
      .finally(() => setIsLoading(false));
  }, [selectTodo]);

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
              {`Todo #${selectTodo.id}`}
            </div>
            {selectTodo && (
              /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => setSelectTodo(null)}
              />
            )}

          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {`${selectTodo.title}`}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className="has-text-danger">
                {selectTodo.completed ? 'Done' : 'Planned'}
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
