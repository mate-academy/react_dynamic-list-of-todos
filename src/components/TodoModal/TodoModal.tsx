import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';

type Props = {
  selectedTodo: Todo,
  setSelectedTodo: (todo: Todo) => void,
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  setSelectedTodo,
}) => {
  const {
    id,
    title,
    userId,
    completed,
  } = selectedTodo;
  const [user, setUser] = useState({ id: 0, name: '' });

  const closeModalWindow = () => {
    setSelectedTodo({
      id: 0,
      title: '',
      completed: false,
      userId: 0,
    });
  };

  useEffect(() => {
    getUser(userId).then((userResp) => setUser(userResp));
  }, [userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user.id ? (
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
              onClick={closeModalWindow}
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

              <a href="mailto:Sincere@april.biz">
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
