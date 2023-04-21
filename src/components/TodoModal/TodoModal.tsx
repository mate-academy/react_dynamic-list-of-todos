import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  selectedTodo: Todo,
  setSelectedTodoId: React.Dispatch<React.SetStateAction<number>>,
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  setSelectedTodoId,
}) => {
  const [user, setUser] = useState<User>();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getUser(selectedTodo.userId)
      .then(setUser)
      .catch(() => {
        setHasError(true);
      });
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user
        ? (
          <Loader />
        )
        : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${selectedTodo.id}`}
              </div>

              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                aria-label="close"
                onClick={() => setSelectedTodoId(0)}
              />
            </header>

            <div className="modal-card-body">
              {hasError
                ? (
                  <div className="has-text-danger">Can&apos;t load todo</div>
                )
                : (
                  <>
                    <p className="block" data-cy="modal-title">
                      {selectedTodo.title}
                    </p>

                    <p className="block" data-cy="modal-user">

                      <strong className={`has-text-${selectedTodo.completed ? 'success' : 'danger'}`}>
                        {selectedTodo.completed ? 'Done' : 'Planned'}
                      </strong>

                      {' by '}

                      <a href={`mailto:${user.email}`}>
                        {user.name}
                      </a>
                    </p>
                  </>
                )}
            </div>
          </div>
        )}
    </div>
  );
};
