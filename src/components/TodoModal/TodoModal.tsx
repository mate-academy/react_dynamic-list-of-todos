import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { Maybe } from '../../types/Maybe';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  setSelectedTodoId: (id: Maybe<number>) => void;
  selectedTodo: Todo;
};

export const TodoModal: React.FC<Props> = ({
  setSelectedTodoId,
  selectedTodo,
}) => {
  const [user, setUser] = useState<Maybe<User>>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    getUser(selectedTodo.userId)
      .then(setUser)
      .then(() => setIsLoadingUser(false));
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoadingUser ? (
        <Loader />
      ) : (
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
              onClick={() => setSelectedTodoId(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              {user && (
                <a href={`mailto:${user.email}`}>
                  {user.name}
                </a>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
