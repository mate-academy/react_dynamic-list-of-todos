import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

interface Props {
  selectedTodo: Todo | null;
  closeTodo: () => void;
}

export const TodoModal: React.FC<Props> = ({ selectedTodo, closeTodo }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isError, setIsError] = useState(false);

  const loadData = async () => {
    try {
      const currentUser = await getUser(selectedTodo?.userId || 0);

      setUser(currentUser);
    } catch {
      setIsError(true);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedTodo]);

  const isCompleted = selectedTodo?.completed
    ? 'Done'
    : 'Planned';

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user
        ? (
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
                onClick={closeTodo}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {selectedTodo?.title}
              </p>
              {isError && (
                <h2 style={{ color: 'red' }}>
                  User not found
                </h2>
              )}
              <p className="block" data-cy="modal-user">
                {/* <strong className="has-text-success">Done</strong> */}
                <strong className={cn({
                  'has-text-danger': !selectedTodo?.completed,
                  'has-text-success': selectedTodo?.completed,
                })}
                >
                  {isCompleted}
                </strong>

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
