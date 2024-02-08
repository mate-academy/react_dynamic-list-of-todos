import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  setModalTodo: React.Dispatch<React.SetStateAction<Todo | undefined>>,
  modalTodo: Todo | undefined,
};

export const TodoModal: React.FC<Props> = ({ setModalTodo, modalTodo }) => {
  const [todoUser, setTodoUser] = useState<User>();

  useEffect(() => {
    if (modalTodo) {
      getUser(modalTodo.userId).then(data => {
        setTodoUser(data);
      });
    }
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {modalTodo && todoUser ? (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {modalTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setModalTodo(undefined)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {modalTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {modalTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={todoUser?.email}>
                {todoUser?.name}
              </a>
            </p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
