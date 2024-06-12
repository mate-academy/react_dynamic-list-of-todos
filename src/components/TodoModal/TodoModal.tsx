import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

interface Props {
  selected: Todo;
  onClosure: (todo: null) => void;
}

export const TodoModal: React.FC<Props> = ({ selected, onClosure }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (selected) {
      setIsLoading(true);
      getUser(selected.userId)
        .then(setUser)
        .finally(() => setIsLoading(false));
    }
  }, [selected]);

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
              Todo #{selected.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => onClosure(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selected.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selected.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href="mailto:Sincere@april.biz">{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
