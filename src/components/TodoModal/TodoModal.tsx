import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Select } from '../../types/otherTypes';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

interface TodoModalProps {
  selectedTodo: Todo;
  onSelect: (todo: Select) => void;
}

export const TodoModal: React.FC<TodoModalProps> = ({
  selectedTodo,
  onSelect,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getUser(selectedTodo.userId)
      .then(userData => {
        setUser(userData);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedTodo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading ? (
        <Loader />
      ) : (
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
              onClick={() => onSelect(null)}
              data-cy="modal-close"
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
              {user && <a href={`mailto:${user.id}`}>{user.name}</a>}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
