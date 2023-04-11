import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';

import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  userId: number
  currentTodo: number
  todos: Todo[]
  selectUser: (id: number) => void
};

export const TodoModal: React.FC<Props> = ({
  userId, todos, selectUser, currentTodo,
}) => {
  const [currentUser, setCurrUser] = useState<User | null>(null);

  useEffect(() => {
    if (userId !== 0) {
      const fetchData = async () => {
        const arrayUsersFromServer = await getUser(userId);

        setCurrUser(arrayUsersFromServer);
      };

      fetchData();
    }
  }, [userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {currentUser === null ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => selectUser(0)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todos.find(todo => todo.id === currentTodo)?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todos.find(todo => todo.id === currentTodo)?.completed
                ? (<strong className="has-text-success">Done</strong>)
                : (<strong className="has-text-danger">Planned</strong>)}

              {' by '}

              <a href={`mailto:${currentUser.email}`}>
                {currentUser.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
