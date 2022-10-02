import React, { useState, useEffect } from 'react';
import { getUser } from '../../api';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  todoId: number;
  todos: Todo[];
  selectTodo: (arg: number) => number | void;
};

export const TodoModal: React.FC<Props> = ({
  todoId,
  todos,
  selectTodo,
}) => {
  const currentTodo = todos.find((todo) => todo.id === todoId);
  const [user, setUser] = useState<User | null>(null);
  // const [todoOpen, setTodoOpen] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (currentTodo) {
        const response = await getUser(currentTodo.userId);

        setUser(response);
      }
    };

    loadUser();
  }, []);

  const hadlerClick = () => {
    selectTodo(0);
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

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              aria-label="close"
              onClick={hadlerClick}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {!currentTodo?.completed
                ? (<strong className="has-text-danger">Planned</strong>)
                : (<strong className="has-text-success">Done</strong>)}
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
