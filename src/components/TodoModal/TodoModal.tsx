import React, { useEffect, useState } from 'react';

import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  activeTodo: Todo,
  selectTodo: (todo: Todo | null) => void,
};

export const TodoModal: React.FC<Props> = ({ activeTodo, selectTodo }) => {
  const [todoUser, setTodoUser] = useState<User | null>(null);
  const {
    id, title, completed, userId,
  } = activeTodo;

  useEffect(() => {
    getUser(userId).then(setTodoUser);

    return () => {
      setTodoUser(null);
    };
  }, [activeTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background">
        {!todoUser ? (
          <Loader />
        ) : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #
                {id}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => selectTodo(null)}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {title}
              </p>
              <p className="block" data-cy="modal-user">
                {completed ? (
                  <strong className="has-text-success">
                    Done
                  </strong>
                ) : (
                  <strong className="has-text-danger">
                    Planned
                  </strong>
                )}
                {' by '}
                <a href={`mailto:${todoUser.email}`}>
                  {todoUser.name}
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
