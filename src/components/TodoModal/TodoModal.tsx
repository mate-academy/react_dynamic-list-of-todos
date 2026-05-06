import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import classNames from 'classnames';

type Props = {
  selectedTodo: Todo;
  onClose: () => void;
};
export const TodoModal: React.FC<Props> = ({ selectedTodo, onClose }) => {
  const [modalLoading, setModalLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setModalLoading(true);
    getUser(selectedTodo.userId)
      .then(setUser)
      .finally(() => setModalLoading(false));
  }, [selectedTodo.userId]);

  const isCompleted = selectedTodo.completed;
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {modalLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
                <strong className={
                  classNames(isCompleted ? "has-text-success" : "has-text-danger")
                }
                >
                  {isCompleted ? 'Done' : 'Planned'}
                </strong>

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
