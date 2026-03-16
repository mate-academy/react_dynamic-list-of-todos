import React, { useEffect } from 'react';
import { Loader } from '../Loader';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  selectedTodo: Todo | null;
  onModalClose?: () => void;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  onModalClose,
}: Props) => {
  const [isModalLoading, setIsModalLoading] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);

  useEffect(() => {
    if (!selectedTodo) {
      return;
    }

    setIsModalLoading(true);

    getUser(selectedTodo.userId)
      .then(setUser)
      .finally(() => {
        setIsModalLoading(false);
      });
  }, [selectedTodo]);

  const isModalActive = selectedTodo !== null;

  return (
    <div
      className={classNames('modal', { 'is-active': isModalActive })}
      data-cy="modal"
    >
      <div className="modal-background" />

      {isModalLoading ? (
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
              onClick={onModalClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
