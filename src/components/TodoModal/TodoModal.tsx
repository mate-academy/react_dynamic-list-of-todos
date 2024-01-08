import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useTodos } from '../../context/TodoProvider';
import { User } from '../../types/User';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const {
    activeTodo,
    setActiveTodo,
    setIsPressed,
    setIsLoading,
    isModalLoading,
    setIsModalLoading,
  } = useTodos();

  const [userOfTodo, setUserOfTodo] = useState<User | null>(null);

  useEffect(() => {
    if (!activeTodo) {
      return;
    }

    getUser(activeTodo.userId).then(data => {
      setUserOfTodo(data);
      setIsModalLoading(false);
      setIsLoading(false);
    });
  }, [activeTodo, setIsModalLoading, setIsLoading]);

  const handleDelete = () => {
    setIsPressed(false);
    setActiveTodo(null);
  };

  if (!activeTodo) {
    return (
      <div>
        Error
      </div>
    );
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isModalLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {activeTodo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleDelete}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {activeTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {activeTodo.completed
                ? (<strong className="has-text-success">Done</strong>)
                : (<strong className="has-text-danger">Planned</strong>)}
              {' by '}

              <a href="mailto:Sincere@april.biz">
                {userOfTodo?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
