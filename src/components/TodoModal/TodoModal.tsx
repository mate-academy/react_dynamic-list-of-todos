/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  todoModal: Todo | null,
  onDeleteSelected: (value: Todo | null) => void,
};

export const TodoModal: React.FC<Props> = ({
  todoModal,
  onDeleteSelected,
}) => {
  const [loaded, setLoaded] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (todoModal) {
      setLoaded(true);

      getUser(todoModal.userId)
        .then(userData => {
          setUser(userData);
          setLoaded(false);
        });
    }
  }, [todoModal]);

  function handleReset() {
    onDeleteSelected(null);
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loaded ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {todoModal?.id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleReset}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todoModal?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={classNames(
                  { 'has-text-danger': !todoModal?.completed },
                  { 'has-text-success': todoModal?.completed },
                )}
              >
                {!todoModal?.completed ? (
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
      )}
    </div>
  );
};
