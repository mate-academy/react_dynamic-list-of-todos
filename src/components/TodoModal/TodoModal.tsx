import React, { useEffect, useState } from 'react';
import { User } from '../../types/User';
import { Loader } from '../Loader';

import { getUser } from '../../api';
import { Todo } from '../../types/Todo';

export type Props = {
  handleClick(id: number | null): void,
  selectedTodo: Todo,
};

export const TodoModal: React.FC<Props> = ({
  handleClick,
  selectedTodo,
}) => {
  const [user, setUser] = useState<User | null>(null);

  async function loadUser() {
    const reponse = await getUser(selectedTodo.userId);

    setUser(reponse);
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
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
              onClick={() => handleClick(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo.completed ? (
                <strong className="has-text-success">
                  Done
                </strong>
              ) : (
                <strong className="has-text-danger">
                  Planned
                </strong>
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
};
