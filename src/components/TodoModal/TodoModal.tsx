import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { PreparedTodo } from '../../types/PreparedTodos';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  selectTodo: PreparedTodo | null,
  setIsModalOpen: (value: boolean) => void,
  setSelectTodo: (todo: Todo | null) => void
};
export const TodoModal: React.FC<Props> = ({
  selectTodo,
  setSelectTodo,
  setIsModalOpen,
}) => {
  const [selectUser, setSelectUser] = useState<User | null>(null);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectUser(null);
    setSelectTodo(null);
  };

  useEffect(() => {
    getUser(selectTodo?.userId || 0)
      .then((user) => setSelectUser(user));
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!selectUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={() => closeModal()}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${selectUser.email}`}>
                {selectUser?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
