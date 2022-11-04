import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { Loader } from '../Loader';
import { getUser } from '../../api';

import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface Props {
  selectedTodo: Todo;
  selectTodo: (todo: Todo | null) => void;
}

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  selectTodo,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const getUserFromServer = async () => {
    setUser(await getUser(selectedTodo?.userId));
    setIsLoaded(true);
  };

  useEffect(() => {
    getUserFromServer();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!isLoaded ? (
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
              onClick={() => selectTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className={cn(
                {
                  'has-text-success': selectedTodo?.completed,
                  'has-text-danger': !selectedTodo?.completed,
                },
              )}
              >
                {selectedTodo?.completed
                  ? 'Done'
                  : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
