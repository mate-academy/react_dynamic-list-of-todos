import React, { FC, useState, useEffect } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  selectedTodo: Todo,
  onClose: () => void,
};

export const TodoModal: FC<Props> = React.memo(
  ({
    selectedTodo, onClose,
  }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
      getUser(selectedTodo.userId)
        .then((loadedUser) => setUser(loadedUser))
        .catch(() => setUser(null));
    }, [selectedTodo.userId]);

    return (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />

        {!user
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
                  onClick={onClose}
                />
              </header>

              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {selectedTodo.title}
                </p>

                <p className="block" data-cy="modal-user">
                  {selectedTodo.completed
                    ? <strong className="has-text-danger">Done</strong>
                    : <strong className="has-text-danger">Planned</strong>}

                  <span> by </span>

                  <a href={`mailto:${user?.email}`}>
                    {user?.name}
                  </a>
                </p>
              </div>
            </div>
          )}
      </div>
    );
  },
);
