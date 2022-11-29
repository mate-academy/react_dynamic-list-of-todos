import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

interface Props {
  todo: Todo,
  deselectTodo: () => void,
}

export const TodoModal: React.FC<Props> = ({ todo, deselectTodo }) => {
  const [activeUser, setActiveUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(todo.userId).then(setActiveUser);
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!activeUser ? (
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
              onClick={() => deselectTodo()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              {todo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${activeUser.email}`}>
                {activeUser.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
