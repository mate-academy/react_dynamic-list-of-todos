import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUsers } from '../../services/getUsers';

type Props = {
  todo: Todo
  setSelectedTodo: (selectedTodo: Todo | null) => void;
};

export const TodoModal: React.FC<Props> = ({ todo, setSelectedTodo }) => {
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setLoaded(true);
    getUsers(todo.userId)
      .then(userItem => {
        setUser(userItem);
        setLoaded(false);
      });
  }, [todo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {loaded ? (
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

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setSelectedTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {!todo.completed
                ? (<strong className="has-text-danger">Planned</strong>)
                : (<strong className="has-text-success">Done</strong>)}

              {' by '}
              {user && (
                <a href={`mailto:${user.email}`}>
                  {user.name}
                </a>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
