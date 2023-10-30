import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

import { getUser } from '../../api';

type Props = {
  todo: Todo;
  onSelected: (value: Todo | null) => void;
};

export const TodoModal: React.FC<Props> = ({ todo, onSelected }) => {
  const [todoLoading, setTodoLoading] = useState(true);
  const [todoUser, setTodoUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(todo.userId)
      .then((givenUser) => {
        setTodoUser(givenUser);
      })
      .finally(() => setTodoLoading(false));
  });

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {todoLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => onSelected(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo.completed ? (
                <strong className="has-text-success">Done</strong>
              )
                : (
                  <strong className="has-text-danger">Planned</strong>
                )}

              {' by '}
              {todoUser && (
                <a href={`mailto:${todoUser.email}`}>
                  {todoUser.name}
                </a>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
