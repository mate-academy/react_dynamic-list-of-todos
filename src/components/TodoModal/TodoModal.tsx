import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  selectedTodo: Todo;
  setSelectedTodo: (todo: Todo | null) => void;

};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  setSelectedTodo,
}) => {
  const [users, setUsers] = useState<User | null>(null);

  useEffect(() => {
    getUser(selectedTodo.userId)
      .then(setUsers)
      .catch(() => {
        throw new Error('Failded loading users');
      });
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {!users && <Loader />}

      {users && (
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
              onClick={() => setSelectedTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong> }

              {' by '}
              <a href={`mailto:${users?.email}`}>
                {users?.name}
              </a>
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
