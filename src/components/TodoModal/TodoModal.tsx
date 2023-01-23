import React, { memo, useEffect, useState } from 'react';
import cn from 'classnames';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  selectedTodo: Todo;
  onCloseModal: () => void;
};

export const TodoModal: React.FC<Props> = memo(
  ({ selectedTodo, onCloseModal }) => {
    const {
      completed,
      id,
      title,
      userId,
    } = selectedTodo;
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
      getUser(userId)
        .then(setUser)
        .catch(() => setUser(null));
    });

    return (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />

        {!user
          ? (
            <Loader />
          )
          : (
            <div className="modal-card">
              <header className="modal-card-head">
                <div
                  className="modal-card-title has-text-weight-medium"
                  data-cy="modal-header"
                >
                  {`Todo #${id}`}
                </div>

                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  type="button"
                  className="delete"
                  data-cy="modal-close"
                  onClick={onCloseModal}
                />
              </header>

              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {title}
                </p>

                <p className="block" data-cy="modal-user">
                  <strong className={cn(
                    {
                      'has-text-success': completed,
                      'has-text-danger': !completed,
                    },
                  )}
                  >
                    {completed ? 'Done' : 'Planned'}
                  </strong>

                  {' by '}

                  <a href={`mailto:${user?.name}`}>
                    {user?.name}
                  </a>
                </p>
              </div>
            </div>
          )}
      </div>
    );
  },
);
