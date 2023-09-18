import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { ERROR_MESSAGE } from '../../helpers/variables';

type Props = {
  selectedTodo: Todo,
  handleSelectedTodo: (todo: Todo | null) => void
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  handleSelectedTodo,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isStatusLoaded, setisStatusLoaded] = useState(false);

  useEffect(() => {
    getUser(selectedTodo.userId)
      .then((user) => setSelectedUser(user))
      .catch(() => ERROR_MESSAGE)
      .finally(() => setisStatusLoaded(true));
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!isStatusLoaded ? (
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
              onClick={() => handleSelectedTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              <a href={`mailto:${selectedUser?.email}`}>
                {selectedUser?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
