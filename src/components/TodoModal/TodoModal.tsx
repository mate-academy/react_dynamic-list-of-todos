import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  userId: number;
  handleChoosenTodo: (id: number, userId: number) => void;
  selectedTodoId: number;
  todos: Todo[];
};

export const TodoModal: React.FC<Props> = ({
  userId,
  handleChoosenTodo,
  selectedTodoId,
  todos,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(userId).then(setUser);
  }, []);

  const choosenTodo = todos.find(todo => todo.id === selectedTodoId);

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
              {`Todo #${selectedTodoId}`}
            </div>

            <button
              aria-label="label"
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => handleChoosenTodo(0, 0)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {choosenTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {choosenTodo?.completed
                ? (<strong className="has-text-success">Done</strong>)
                : (<strong className="has-text-danger">Planned</strong>)}

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
