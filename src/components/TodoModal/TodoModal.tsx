import React, { useEffect, useState } from 'react';

import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

import { Loader } from '../Loader';

type Props = {
  selectedTodo: Todo | null;
  closeModal: () => void;
};

export const TodoModal: React.FC<Props> = ({ selectedTodo, closeModal }) => {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(selectedTodo?.id || 0)
      .then(res => setUser(res))
      .catch(reg => {
        throw new Error(reg);
      })
      .finally(() => setLoading(false));
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
              {`Todo #${selectedTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo?.completed
                ? (
                  <strong className="has-text-success">
                    Done
                  </strong>
                ) : (
                  <strong className="has-text-danger">
                    Planned
                  </strong>
                )}

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
