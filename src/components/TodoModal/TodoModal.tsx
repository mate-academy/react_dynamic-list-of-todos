import React, { useState, useEffect } from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

import { getUser } from '../../api';

import { Loader } from '../Loader';

type Props = {
  isTodoSelected: Todo,
  setIsTodoSelected: (value: Todo | null) => void,
};

export const TodoModal: React.FC<Props> = ({
  isTodoSelected,
  setIsTodoSelected = () => { },
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(isTodoSelected.userId)
      .then(setUser);
  }, [isTodoSelected.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {user ? (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${isTodoSelected.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="modal-close"
              type="button"
              className="delete"
              onClick={() => setIsTodoSelected(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {isTodoSelected.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className={cn({
                'has-text-danger': !isTodoSelected.completed,
                'has-text-success': isTodoSelected.completed,
              })}
              >
                {!isTodoSelected.completed ? (
                  'Planned'
                ) : (
                  'Done'
                )}
              </strong>

              {' by '}

              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      ) : (
        <Loader />
      )}

    </div>
  );
};
