import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  selectedTodo: Todo | null;
  selectTodo: (todo: Todo | null) => void;
};

export const TodoModal: React.FC<Props> = ({ selectedTodo, selectTodo }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
    getUser(selectedTodo!.userId).then((response) => {
      setUser(response);
    });
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {selectedTodo && user ? (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo.id}`}
            </div>

            <button
              aria-label="modal-close"
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => selectTodo(null)}
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

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
