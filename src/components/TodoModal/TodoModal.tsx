import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  selectedTodoUserId: number,
  selectedTodo: Todo | null,
  handleShowSelectedTodoButton: (value: boolean) => void,
};

export const TodoModal: React.FC<Props> = ({
  selectedTodoUserId,
  selectedTodo,
  handleShowSelectedTodoButton,
}) => {
  const [selectedTodoUser, setSelectedTodoUser] = useState<null | User>(null);
  const [closeButtonOn, setCloseButtonOn] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUser(selectedTodoUserId)
      .then(setSelectedTodoUser)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div
      className={classnames('modal', {
        'is-active': closeButtonOn,
      })}
      data-cy="modal"
    >
      <div className="modal-background" />

      {loading
        ? (
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
                onClick={() => {
                  setCloseButtonOn(!closeButtonOn);
                  handleShowSelectedTodoButton(false);
                }}
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
                  ) : (
                    <strong className="has-text-danger">Planned</strong>
                  )}

                {' by '}

                <a href={`mailto:${selectedTodoUser?.email}`}>
                  {selectedTodoUser?.name}
                </a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
