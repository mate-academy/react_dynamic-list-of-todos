import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  userId: number,
  setUserId: (id: number) => void,
  todos: Todo[],
  selectedTodoId: number
  selectTodo: (id: number) => void,
};

export const TodoModal: React.FC<Props> = ({
  userId,
  setUserId,
  todos,
  selectedTodoId,
  selectTodo,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const selectedUser = await getUser(userId);

        setUser(selectedUser);
        setIsLoading(false);
      } catch (error) {
        setUserId(0);
        selectTodo(0);
        Error('Failed to download');
      }
    };

    fetchUser();
  }, []);

  const todo: Todo = todos.filter((toDo) => toDo.id === selectedTodoId)[0];

  const handleModalClosing = () => {
    setUserId(0);
    selectTodo(0);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && <Loader />}

      {user && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleModalClosing}
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
