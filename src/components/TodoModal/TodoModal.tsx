import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  currentTodo: Todo ;
  setCurrentTodo: (value: Todo | null) => void;
};

export const TodoModal: React.FC<Props> = ({ currentTodo, setCurrentTodo }) => {
  const ticketStatus = currentTodo?.completed ? 'Done' : 'Planned';
  const ticketStatusCollor = currentTodo?.completed
    ? 'has-text-success'
    : 'has-text-danger';

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (currentTodo) {
      getUser(currentTodo.userId).then((data) => setUser(data));
    }
  }, [currentTodo]);

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
              {`Todo #${currentTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={() => setCurrentTodo(null)}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className={ticketStatusCollor}>{ticketStatus}</strong>

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
