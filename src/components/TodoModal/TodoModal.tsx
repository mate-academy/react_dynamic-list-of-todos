import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';

import { Loader } from '../Loader';

import { OptionalUser } from '../../types/OptionalUser';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  closeTodoModal: () => void;
};

export const TodoModal: React.FC<Props> = ({ todo, closeTodoModal }) => {
  const [todoUser, setTodoUser] = useState<OptionalUser>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  const {
    id,
    userId,
    title,
    completed,
  } = todo;

  useEffect(() => {
    getUser(userId).then((user) => {
      setTodoUser(user);
      setIsUserLoading(false);
    });
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isUserLoading ? (
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

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeTodoModal}
              aria-label="close modal window"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {todoUser && (
                <>
                  {' by '}

                  <a href={`mailto:${todoUser.email}`}>{todoUser.name}</a>
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
