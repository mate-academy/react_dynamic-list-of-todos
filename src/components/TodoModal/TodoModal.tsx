import React, { useContext, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import classNames from 'classnames';

import { TodoContext } from '../../Contexts/TodoContext';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const { currentTodo, setCurrentTodo } = useContext(TodoContext);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentTodo) {
      getUser(currentTodo.userId).then(setCurrentUser);
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  }, [currentTodo]);

  return (
    currentTodo && (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />

        <div className="modal-card">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <header className="modal-card-head">
                <div
                  className="modal-card-title has-text-weight-medium"
                  data-cy="modal-header"
                >
                  Todo #{currentTodo?.id}
                </div>

                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  type="button"
                  className="delete"
                  data-cy="modal-close"
                  onClick={() => setCurrentTodo(null)}
                />
              </header>
              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {currentTodo?.title}
                </p>

                <p className="block" data-cy="modal-user">
                  {/* <strong className="has-text-success">Done</strong> */}
                  <strong
                    className={classNames({
                      'has-text-success': currentTodo.completed,
                      'has-text-danger': !currentTodo.completed,
                    })}
                  >
                    {currentTodo.completed ? 'Done' : 'Planned'}
                  </strong>

                  {' by '}

                  <a href={`mailto:${currentUser?.email}`}>
                    {currentUser?.name}
                  </a>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    )
  );
};
