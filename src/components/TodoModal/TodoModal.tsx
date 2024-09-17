import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

interface Props {
  selectedTodo: Todo;
  getUser: (id: number) => Promise<User>;
  setSelectedTodo: (todo: Todo | null) => void;
  setSelectedId: (id: number | null) => void;
}

export const TodoModal: React.FC<Props> = ({
  getUser,
  selectedTodo,
  setSelectedTodo,
  setSelectedId,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const handleClick = () => {
    setSelectedId(null);
    setSelectedTodo(null);
  };

  useEffect(() => {
    getUser(selectedTodo.userId).then(userData => {
      setUser(userData);
    });
  }, [getUser, selectedTodo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {user ? (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectedTodo.id}
            </div>
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleClick}
            />
          </header>
          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>
            <p className="block" data-cy="modal-user">
              {selectedTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}
              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
