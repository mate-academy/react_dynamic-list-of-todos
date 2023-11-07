import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

interface Props {
  activeTodo: Todo,
  setActiveTodo: (todo: Todo | null) => void,
}

export const TodoModal: React.FC<Props> = ({
  activeTodo,
  setActiveTodo,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeUser, setActiveUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(activeTodo.userId)
      .then(setActiveUser)
      .finally(() => setIsLoading(false));
  }, [activeTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading
        ? (<Loader />)
        : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #
                {activeTodo?.id}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => setActiveTodo(null)}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {activeTodo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                <strong className={classNames({
                  'has-text-success': activeTodo?.completed,
                  'has-text-danger': !activeTodo?.completed,
                })}
                >
                  {activeTodo?.completed ? 'Done' : 'Planned'}
                </strong>

                {' by '}

                <a href={`mailto:${activeUser?.email}`}>
                  {activeUser?.name}
                </a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
