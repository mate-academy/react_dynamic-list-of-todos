import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

interface Props {
  todo: Todo;
  setIsActiveModal: (isActiveModal: boolean) => void;
  setTodo: (todo: Todo | null) => void;
}

export const TodoModal: React.FC<Props> = (props) => {
  const { todo, setIsActiveModal, setTodo } = props;
  const [user, setUser] = useState<User | null>(null);
  const [isLoadedUser, setIsLoadedUser] = useState(false);

  useEffect(() => {
    if (todo !== null) {
      getUser(todo.userId)
        .then(usersData => {
          if (usersData) {
            setUser(usersData);
            setIsLoadedUser(true);
          }
        });
    }
  },
  []);

  const handelCloseModal = () => {
    setIsActiveModal(false);
    setTodo(null);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!isLoadedUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {todo.id}
            </div>

            <button
              type="button"
              aria-label="Mute volume"
              className="delete"
              data-cy="modal-close"
              onClick={handelCloseModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              <a href={`mailto:${user && user.email}`}>
                {user && user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
