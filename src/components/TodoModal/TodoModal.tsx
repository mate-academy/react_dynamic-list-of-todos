import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { TodoContext } from '../../TodoContext/TodoContext';
import { User } from '../../types/User';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const { selectedTodo, selectTodo } = useContext(TodoContext);
  const [author, setAuthor] = useState<User | null >(null);

  useEffect(() => {
    if (selectedTodo) {
      getUser(selectedTodo.userId)
        .then((user) => setAuthor(user));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {author === null ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo?.id}`}
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
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className={classNames({
                'has-text-danger': !selectedTodo?.completed,
                'has-text-success': selectedTodo?.completed,
              })}
              >
                {selectedTodo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${author?.email}`}>
                {author?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
