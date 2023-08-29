import classNames from 'classnames';

import React, { useState, useEffect, useCallback } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Loader } from '../Loader';

type Props = {
  selectedTodo?: Todo,
  setSelectedTodo: () => void,
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  setSelectedTodo,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User>();

  const fetchUser = useCallback(async (userId: number) => {
    setIsLoading(true);

    if (userId) {
      try {
        const fetchedUser = await getUser(userId);

        setUser(fetchedUser);
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (selectedTodo) {
      fetchUser(selectedTodo.userId);
    }
  }, [selectedTodo, fetchUser]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && (
        <Loader />
      )}

      {!isLoading && selectedTodo && (
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
              title="close icon"
              onClick={() => setSelectedTodo()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className={classNames({
                'has-text-success': selectedTodo.completed,
                'has-text-danger': !selectedTodo.completed,
              })}
              >
                {selectedTodo.completed ? 'Done' : 'Planned'}
              </strong>

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
