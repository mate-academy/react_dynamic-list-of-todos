import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  selectedTodo: Todo;
  deleteSelection: () => void
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  deleteSelection,
}) => {
  const [currUser, setCurrUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(selectedTodo.userId)
      .then(user => setCurrUser(user));
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!currUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={deleteSelection}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className="has-text-success">Done</strong>
              <strong
                className={classNames(
                  { 'has-text-danger': !selectedTodo.completed },
                  { 'has-text-success': selectedTodo.completed },
                )}
              >
                {selectedTodo.completed ? 'Done' : 'Planned'}

              </strong>

              {' by '}

              <a href={`mailto:${currUser.email}`}>
                {currUser.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
