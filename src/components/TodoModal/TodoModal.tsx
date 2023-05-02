import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  selectedTodo: Todo,
  setTodoModal: (selectedTodo: Todo | null) => void,
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  setTodoModal,
}) => {
  const {
    id, title, completed, userId,
  } = selectedTodo;

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(userId)
      .then(userInData => {
        setUser(userInData);
      });
  }, []);

  const handleClick: () => void = () => {
    setTodoModal(null);
    setUser(null);
  };

  const { name, email } = user || {};

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
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
              onClick={handleClick}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${email}`}>
                {name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
