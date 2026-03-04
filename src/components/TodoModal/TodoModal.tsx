import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

import classNames from 'classnames';

type Props = {
  selectedTodo: Todo | undefined;
  onSelectModalId: (userId: number | null) => void;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  onSelectModalId,
}) => {
  const [user, setUser] = useState<User>();
  const [dataHasFinished, setDataHasFinished] = useState<boolean>(false);

  const userId = selectedTodo?.userId;

  useEffect(() => {
    if (userId) {
      getUser(userId)
        .then(setUser)
        .finally(() => setDataHasFinished(true));
    }
  }, [userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!dataHasFinished ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectedTodo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setDataHasFinished(false);
                onSelectModalId(null);
              }}
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
                {selectedTodo?.completed}
              </strong>

              {selectedTodo?.completed ? 'Done' : 'Planned'}

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
