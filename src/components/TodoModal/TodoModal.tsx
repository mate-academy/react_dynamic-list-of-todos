import React, { useEffect, useState } from 'react';

import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Loader } from '../Loader';
import classNames from 'classnames';

interface Props {
  selectTodo: Todo;
  onSelectTodo?: (value: Todo | null) => void;
}

export const TodoModal: React.FC<Props> = ({
  selectTodo,
  onSelectTodo = () => {},
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const handleCloseIcon = () => {
    onSelectTodo(null);
  };

  useEffect(() => {
    setLoading(true);
    getUser(selectTodo.userId)
      .then(setUser)
      .finally(() => setLoading(false));
  }, [selectTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectTodo.id}
            </div>

            <button
              type="button"
              className="delete"
              aria-label="Close modal"
              data-cy="modal-close"
              onClick={handleCloseIcon}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={classNames(
                  selectTodo.completed ? 'has-text-success' : 'has-text-danger',
                )}
              >
                {selectTodo.completed ? 'Done' : 'Planned'}
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
