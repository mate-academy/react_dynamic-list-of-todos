import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { useEffect, useState } from 'react';
import { getUser } from '../../api';
import React from 'react';
import classNames from 'classnames';

type Props = {
  todoModalStatus: boolean;
  handleCloseModal: () => void;
  selectedTodo: Todo | null;
};

export const TodoModal: React.FC<Props> = ({
  todoModalStatus,
  handleCloseModal,
  selectedTodo,
}) => {
  const [preparedUser, setPreparedUser] = useState<User | null>(null);

  useEffect(() => {
    if (!selectedTodo) {
      return;
    }

    setPreparedUser(null);
    getUser(selectedTodo.userId).then(user => setPreparedUser(user));
  }, [selectedTodo]);

  if (!todoModalStatus || !selectedTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!preparedUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectedTodo.id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleCloseModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={classNames({
                  'has-text-danger': !selectedTodo.completed,
                  'has-text-success': selectedTodo.completed,
                })}
              >
                {!selectedTodo.completed ? 'Planned' : 'Done'}
              </strong>

              {' by '}

              <a href={`mailto:${preparedUser?.email}`}>{preparedUser?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
