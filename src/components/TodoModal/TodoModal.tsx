import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';

type Props = {
  activeTodo: Todo;
  setActiveTodo: (todo:Todo | null) => void;
};

export const TodoModal: React.FC<Props> = ({
  activeTodo,
  setActiveTodo,
}) => {
  const [userName, setUserName] = useState('');
  const [isLoaderUser, setLoaderUser] = useState(false);

  useEffect(() => {
    getUser(activeTodo.userId)
      .then(response => {
        setUserName(response.name);
      })
      .finally(() => {
        setLoaderUser(true);
      });
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!isLoaderUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${activeTodo.id}`}
            </div>
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              aria-label="close Todo Info"
              onClick={() => setActiveTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {activeTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {activeTodo.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              <a href="mailto:Sincere@april.biz">
                {userName}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
