import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { Loader } from '../Loader';
import { TodoModalError } from '../TodoModalError';

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
      <TodoModalError onTodoSelected={onTodoSelected} />
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

          <button
            aria-label="modal-close-button"
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
            <strong className={classNames({
              'has-text-success': selectedTodo?.completed,
              'has-text-danger': !selectedTodo?.completed,
            })}
            >
              {selectedTodo?.completed
                ? 'Done'
                : 'Planned'}
            </strong>

            {' by '}

            <a
              href={`mailto:${user
                ? user.email
                : 'site.support@gmail.com'}`}
            >
              {user
                ? user.name
                : 'User unknown. If you think its error, write to our support'}
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
