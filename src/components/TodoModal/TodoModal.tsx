import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Loader } from '../Loader';

import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  choosedTodo: Todo | null;
  clearChoosedTodo: () => void;
};

export const TodoModal: React.FC<Props> = ({
  choosedTodo,
  clearChoosedTodo,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (choosedTodo !== null) {
      getUser(choosedTodo.userId)
        .then((userFromServer) => setUser(userFromServer));
    }
  }, []);

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
              Todo #
              {choosedTodo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                clearChoosedTodo();
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {choosedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {choosedTodo?.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
