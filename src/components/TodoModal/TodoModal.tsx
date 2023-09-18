import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  onHandleCloseModal: () => void;
  selectedTodo: Todo | null;
};

export const TodoModal: React.FC<Props> = ({
  onHandleCloseModal = () => {},
  selectedTodo,
}) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (selectedTodo) {
      getUser(selectedTodo.userId).then(setUser);
    }
  }, []);

  return (
    <div
      className="modal is-active"
      data-cy="modal"
    >
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
              {`Todo #${selectedTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onHandleCloseModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {!selectedTodo?.completed
                ? <strong className="has-text-danger">Planned</strong>
                : <strong className="has-text-success">Done</strong>}

              {' by '}

              <a href={`mailto:${user?.name}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
