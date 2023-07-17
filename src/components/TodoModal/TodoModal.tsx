import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { Loader } from '../Loader';
import { User } from '../../types/User';

interface Props {
  selectedTodo: Todo | null;
  setSelectedTodo: (todo: Todo | null) => void;
}

export const TodoModal: React.FC<Props> = React.memo(({
  selectedTodo,
  setSelectedTodo,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    if (selectedTodo) {
      getUser(selectedTodo.userId)
        .then(setSelectedUser);
    }
  }, [selectedTodo]);

  const handleClickDeleteButton = () => {
    setSelectedTodo(null);
  };

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
              {`Todo #${selectedTodo?.id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleClickDeleteButton}
              aria-label="delete button"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className={classNames(
                { 'has-text-danger': !selectedTodo?.completed },
                { 'has-text-success': selectedTodo?.completed },
              )}
              >
                {selectedTodo?.completed
                  ? 'Done'
                  : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${selectedUser.email}`}>
                {selectedUser.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
});
