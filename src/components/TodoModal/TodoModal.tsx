import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

interface Props {
  todo: Todo;
  setCurrentTodo: (todo: Todo | null) => void;
}

export const TodoModal: React.FC<Props> = ({ todo, setCurrentTodo }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUser(todo.userId)
      .then(user => {
        setCurrentUser(user);
      })
      .finally(() => setLoading(false));
  }, [todo.userId]);

  // Function definition
  const handleClick = () => {
    setCurrentTodo(null);
    setLoading(false);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {!loading ? (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo
              {' #'}
              {todo.id}
            </div>
            <button
              aria-label="button"
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => handleClick()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              <a href={currentUser?.email}>{currentUser?.name}</a>
            </p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
