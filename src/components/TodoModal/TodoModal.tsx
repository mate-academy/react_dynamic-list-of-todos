import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { Loader } from '../Loader';

import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

import { getUser } from '../../api';

type Props = {
  selectedTodo: Todo | null,
  onTodoSelected: (id: number | null) => void,
};

export const TodoModal: React.FC<Props> = React.memo(({
  selectedTodo,
  onTodoSelected,
}) => {
  const [isModalLoading, setIsModalLoading] = useState(true);
  const [hasModalError, setHasModalError] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setHasModalError(false);
    setIsModalLoading(true);

    if (selectedTodo) {
      getUser(selectedTodo?.userId)
        .then(setUser)
        .catch(() => setHasModalError(true))
        .finally(() => setIsModalLoading(false));
    }
  }, [selectedTodo?.id]);

  const renderingModal = hasModalError
    ? (
      <h3>Error occured when data loaded</h3>
    )
    : (
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
            onClick={() => onTodoSelected(null)}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {selectedTodo?.title}
          </p>

          <p className="block" data-cy="modal-user">
            {selectedTodo?.completed
              ? (
                <strong className="has-text-success">Done</strong>
              )
              : (
                <strong className="has-text-danger">Planned</strong>
              )}

            {' by '}

            <a href={`mailto:${user?.email}`}>
              {user?.name}
            </a>
          </p>
        </div>
      </div>
    );

  return (
    <div
      className={classNames(
        'modal',
        {
          'is-active': selectedTodo,
        },
      )}
      data-cy="modal"
    >
      <div className="modal-background" />

      {isModalLoading
        ? (
          <Loader />
        )
        : renderingModal}
    </div>
  );
});
