import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';

import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  currentTodo: Todo | null
  onChangeTodo: (todo: Todo | null) => void
};

export const TodoModal: React.FC<Props> = ({
  currentTodo,
  onChangeTodo,
}) => {
  const [currentUser, setCurrUser] = useState<User | null>(null);

  useEffect(() => {
    if (currentTodo !== null) {
      const fetchData = async () => {
        const userFromServer = await getUser(currentTodo?.userId);

        setCurrUser(userFromServer);
      };

      fetchData();
    }
  }, [currentTodo]);

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
              {`Todo #${currentTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => onChangeTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo?.completed
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
