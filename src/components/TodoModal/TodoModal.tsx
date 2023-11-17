import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  selectedTodo: Todo;
  // setSelectedTodo: (value: Todo) => void
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  // setSelectedTodo,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const {
    id, title, completed, userId,
  } = selectedTodo;

  useEffect(() => {
    getUser(userId).then(setUser);
  }, [userId]);

  const statusTask = completed ? 'Done' : 'Planned';

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {false ? (
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
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className="has-text-danger">{statusTask}</strong>

              {' by '}

              <a href="mailto:Sincere@april.biz">
                {user}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
