import React, { useEffect, useState } from 'react';

import { Loader } from '../Loader';
import { getUser } from '../../api';

import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

import cn from 'classnames';

type Props = {
  currentTodo: Todo | null;
  selectedUserId: number | null;
  setSelectedTodo: (todo: Todo | null) => void;
};

export const TodoModal: React.FC<Props> = ({
  currentTodo,
  selectedUserId,
  setSelectedTodo,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (selectedUserId) {
      getUser(selectedUserId)
        .then(res => setUser(res))
        .finally(() => setIsLoading(false));
    }
  }, [selectedUserId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{currentTodo?.id}
            </div>

            <button
              onClick={() => setSelectedTodo(null)}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={cn({
                  'has-text-danger': !currentTodo?.completed,
                  'has-text-success': currentTodo?.completed,
                })}
              >
                {currentTodo?.completed ? 'Done' : 'Planned'}
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
