import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  selectedTodo: Todo | null,
  onDelete?: () => void,
};

export const TodoModal: React.FC<Props> = ({ selectedTodo, onDelete }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (selectedTodo) {
      getUser(selectedTodo.userId)
        .then(setUser)
        .finally(() => setIsLoading(false));
    }
  }, [selectedTodo]);

  return (
    <div
      className={cn(
        'modal',
        {
          'is-active': selectedTodo,
        },
      )}
      data-cy="modal"
    >
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
              Todo #
              {selectedTodo?.id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              aria-label="Close"
              onClick={onDelete}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo?.completed
                ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}

              {' by '}

              <a href="mailto:Sincere@april.biz">
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
