import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  selectedUser: User;
  userTodo: Todo | null;
  resetSelection: () => void;
};

export const TodoModal: React.FC<Props> = ({
  selectedUser,
  userTodo,
  resetSelection,
}) => {
  const [isLoaderShowing, setIsLoaderShowing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaderShowing(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoaderShowing ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{userTodo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={resetSelection}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {userTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {userTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href="mailto:Sincere@april.biz">{selectedUser.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
