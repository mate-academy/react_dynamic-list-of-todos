import React, { useContext, useEffect, useState } from 'react';
import { TodosContext } from '../../TodosProvider';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const {
    selectedTodo,
    setSelectedTodo,
    setIsTodoSelected,
  } = useContext(TodosContext);

  const [user, setUser] = useState<User | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getUser(selectedTodo.userId)
      .then((userData) => {
        setIsTodoSelected(true);
        setUser(userData);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectedTodo.userId, setIsTodoSelected]);

  const clearSelectedTodo = () => {
    setSelectedTodo({
      title: '',
      completed: false,
      id: 0,
      userId: 0,
    });
    setIsTodoSelected(false);
  };

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
              onClick={clearSelectedTodo}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>
            <p className="block" data-cy="modal-user">
              {selectedTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
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
