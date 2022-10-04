import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  selectTodo: () => Todo | undefined;
  viewModule: (id :number) => void
};

export const TodoModal: React.FC<Props> = ({ selectTodo, viewModule }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const selectedTodo = selectTodo();

  if (!selectedTodo) {
    return null;
  }

  const {
    userId,
    id,
    title,
    completed,
  } = selectedTodo;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getUser(userId)
      .then(result => setSelectedUser(result));
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!selectedUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => viewModule(0)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              {completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              <a href={selectedUser.email}>
                {selectedUser.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
