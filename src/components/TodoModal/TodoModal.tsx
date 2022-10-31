import React, { useState, useEffect } from 'react';
import className from 'classnames';

import { Loader } from '../Loader';
import { getUser } from '../../api';

import { Todo } from '../../types/Todo';

type Props = {
  setSelectedTodo: (x: Todo) => void
  selectedTodo: Todo
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  setSelectedTodo,
}) => {
  const { title, id, completed } = selectedTodo;
  const [user, setUser] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    getUser(id).then(a => {
      setUser(a);
    });
  });

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user.name ? (
        <Loader />
      ) : (
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
              onClick={() => {
                setSelectedTodo({
                  id: 0,
                  title: '',
                  completed: false,
                  userId: 0,
                });
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className={className(
                completed ? 'has-text-success' : 'has-text-danger',
              )}
              >
                {completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
