import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  modalTodo: Todo,
  setModalActive: (value: boolean) => void,
};

export const TodoModal: React.FC<Props> = ({ modalTodo, setModalActive }) => {
  const [user, setUser] = useState<User>();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getUser(modalTodo.userId).then(setUser)
      .finally(() => setLoader(false));
  },[modalTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loader ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #2
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setModalActive(false)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {modalTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {modalTodo.completed 
                ? (<strong className="has-text-success">Done</strong>)
                : (<strong className="has-text-danger">Planned</strong>)}
              {' by '}

              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
