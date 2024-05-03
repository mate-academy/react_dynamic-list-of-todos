import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';

interface TodoModalProps {
  todo: Todo; // Айди туду
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
}

export const TodoModal: React.FC<TodoModalProps> = ({
  todo,
  setSelectedTodo,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(todo.userId).then(data => {
      setUser(data);
    });
  }, [todo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo.id}`}
            </div>
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setSelectedTodo(null);
              }}
            />
          </header>
          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              quis ut nam facilis et officia qui
            </p>
            {/* Если есть данные пользователя, используем их для отображения информации */}
            {user && (
              <p className="block" data-cy="modal-user">
                <strong style={{ color: todo.completed ? 'green' : 'red' }}>
                  Planned
                </strong>{' '}
                by <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
