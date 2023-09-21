import React, { useState, useEffect, useCallback } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Loader } from '../Loader';

type TodoModalProps = {
  task: Todo,
  setTask: () => void,
};

export const TodoModal: React.FC<TodoModalProps> = ({
  task,
  setTask,
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
    if (task) {
      fetchUser(task.userId);
    }
  }, [task, fetchUser]);

  const getTodoStatus = () => {
    if (task.completed) {
      return (
        <strong className="has-text-success">Done</strong>
      );
    }

    return (
      <strong className="has-text-danger">Planned</strong>
    );
  };

  const handleModalClose = () => {
    setTask();
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && (
        <Loader />
      )}

      {!isLoading && task && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${task.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              title="close icon"
              onClick={handleModalClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {task.title}
            </p>

            <p className="block" data-cy="modal-user">
              {getTodoStatus()}
              {' '}
              by
              {' '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
