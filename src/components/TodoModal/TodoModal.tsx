import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  todo: Todo | null;
  onChangeShowModal: (value: boolean) => void;
  onChangeTodoId: (value: number | null) => void;
};

export const TodoModal: React.FC<Props> = ({
  todo,
  onChangeShowModal,
  onChangeTodoId,
}) => {
  const [modalLoading, setModalLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!todo) {
      return;
    }

    getUser(todo.userId)
      .then(userFromServer => {
        if (!userFromServer) {
          throw new Error('Got no user please try again later');
        }

        if (!todo) {
          throw new Error('Got no todo please try again later');
        }

        setUser(userFromServer);
      })
      .finally(() => setModalLoading(false));
  }, [todo, user]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {modalLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                onChangeShowModal(false);
                onChangeTodoId(null);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={
                  todo?.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {todo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
