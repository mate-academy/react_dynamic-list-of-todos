import React, { useCallback, useEffect, useState } from 'react';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

import { getUser } from '../../api';

import { Loader } from '../Loader';

type Props = {
  selectedTodo: Todo;
  onRemoveTodoSelection: () => void;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  onRemoveTodoSelection,
}) => {
  const [
    userForSelectedTodo,
    setUserForSelectedTodo,
  ] = useState<User | null>(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  const getUserForSelectedTodo = useCallback(async (userId) => {
    const userById = await getUser(userId);

    setUserForSelectedTodo(userById);
    setIsUserLoaded(true);
  }, []);

  useEffect(() => {
    getUserForSelectedTodo(selectedTodo.userId);
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!isUserLoaded
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
                onClick={() => onRemoveTodoSelection()}
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

                <a href={`mailto:${userForSelectedTodo?.email}`}>
                  {userForSelectedTodo?.name}
                </a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
