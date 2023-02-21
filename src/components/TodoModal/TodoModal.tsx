import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  todo: Todo | null,
  setTodo: (obj: Todo | null) => void,
};

export const TodoModal: React.FC<Props> = ({ todo, setTodo }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    if (!todo) {
      return;
    }

    getUser(todo.userId)
      .then(setSelectedUser);
  }, [todo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {
        !selectedUser
          ? <Loader />
          : (
            <div className="modal-card">
              <header className="modal-card-head">
                <div
                  className="modal-card-title has-text-weight-medium"
                  data-cy="modal-header"
                >
                  {`Todo #${todo?.id}`}
                </div>

                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  type="button"
                  className="delete"
                  data-cy="modal-close"
                  onClick={() => {
                    setTodo(null);
                    setSelectedUser(null);
                  }}
                />
              </header>

              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {todo?.title}
                </p>

                <p className="block" data-cy="modal-user">
                  {
                    todo?.completed
                      ? <strong className="has-text-success">Done</strong>
                      : <strong className="has-text-danger">Planned</strong>
                  }

                  {' by '}

                  <a href="mailto:Sincere@april.biz">
                    {selectedUser.name}
                  </a>
                </p>
              </div>
            </div>
          )
      }
    </div>
  );
};
