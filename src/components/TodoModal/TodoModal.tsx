import React, { memo, useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  selectedTodo: Todo;
  onSelectedTodoIdChange: React.Dispatch<React.SetStateAction<number>>;
};

export const TodoModal: React.FC<Props> = memo((props) => {
  const [user, setUser] = useState<User | null>(null);
  const [isError, setIsError] = useState(false);

  const { selectedTodo, onSelectedTodoIdChange } = props;

  useEffect(() => {
    try {
      getUser(selectedTodo.userId).then(setUser);
    } catch {
      setIsError(true);
    }
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {isError && (
        <h1>Ooops, looks like smth went wrong</h1>
      )}

      {user === null
        ? <Loader />
        : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${selectedTodo.id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => {
                  onSelectedTodoIdChange(0);
                }}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {selectedTodo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {selectedTodo.completed ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}

                {' by '}

                <a href={`mailto:${user.email}`}>
                  {user.name}
                </a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
});
