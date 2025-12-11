import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import classNames from 'classnames';
import type { Todo } from '../../types/Todo';
import type { User } from '../../types/User';

type Props = {
  switchMode: boolean;
  selectedTodo: Todo | null;
  onSwitch: (value: boolean) => void;
};

export const TodoModal: React.FC<Props> = ({
  switchMode,
  selectedTodo,
  onSwitch,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>();
  const useId = selectedTodo?.userId;

  useEffect(() => {
    if (!switchMode) {
      return;
    }

    setLoading(true);
    setUser(null);
    getUser(useId)
      .then(setUser)
      .catch(error => {
          // eslint-disable-next-line no-console
        console.error('Error fetching userId', error);
      })
      .finally(() => setLoading(false));
  }, [selectedTodo, switchMode, useId]);

  return (
    <div
      className={classNames('modal', {
        'is-active': switchMode,
      })}
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
              {'Todo #' + selectedTodo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label*/}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => onSwitch(false)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={classNames({
                  'has-text-success': selectedTodo?.completed,
                  'has-text-danger': !selectedTodo?.completed,
                })}
              >
                {selectedTodo?.completed ? 'Done' : 'Planned'}
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
