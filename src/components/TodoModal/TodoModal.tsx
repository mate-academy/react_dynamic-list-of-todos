import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  todoId: number;
  selectedTodos: Todo[];
  selectedUser: (value: number | null) => void,
};

export const TodoModal: React.FC<Props> = ({
  todoId,
  selectedTodos,
  selectedUser,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const relevantTodo = selectedTodos.find(todo => todo.id === todoId);

  const addData = async () => {
    if (relevantTodo) {
      const get = await getUser(relevantTodo.userId);

      setUser(get);
    }
  };

  useEffect(() => {
    addData();
  }, []);

  const handleReset = (): void => {
    selectedUser(null);
  };

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
              {`Todo #${todoId}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleReset}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {relevantTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {
                relevantTodo?.completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>
              }

              {' by '}

              <a href={`mailto: ${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
