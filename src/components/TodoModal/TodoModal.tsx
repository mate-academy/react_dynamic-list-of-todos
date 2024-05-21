import React, { useContext, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { CurrentTodo } from '../../contexts/CurrentTodoProvider';
import { User } from '../../types/User';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const [loader, setLoader] = useState(true);
  const { todo, setTodo } = useContext(CurrentTodo);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (todo) {
      getUser(todo.userId).then(response => {
        setUser(response);

        setLoader(false);
      });
    }
  }, [todo]);

  return (
    <>
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />
        {loader && <Loader />}
        {todo && !loader && (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #{todo.id}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => setTodo(null)}
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

                <a href={'mailto:' + user?.email}>{user?.name}</a>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
