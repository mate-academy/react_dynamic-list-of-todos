import React, { useState, useEffect } from 'react';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  selectedTodo: Todo;
  setSelectedTodo: (todo:Todo | null) => void;
}

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  setSelectedTodo
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getUser(selectedTodo.userId)
      .then(user => setUser(user))
      .finally(() => setIsLoading(false));
  }, [selectedTodo.userId])

  const statusMsg = selectedTodo.completed ? 'Done' : 'Planned';

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
              {`Todo #${selectedTodo.id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setSelectedTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className={
                `has-text-${selectedTodo.completed ? 'success' : 'danger'
                }`}>
                {statusMsg}
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
