import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
/* eslint-disable max-len */

interface Props {

  modalToDo: Todo | null,
  setmodalOn: (value: boolean) => void
  setmodalTodo: (value: null) => void
}

export const TodoModal: React.FC<Props> = ({ modalToDo, setmodalOn, setmodalTodo }) => {
  const [showLoader, setshowLoader] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    if (modalToDo) {
      setshowLoader(true);

      getUser(modalToDo.userId).then(user => setCurrentUser(user)).finally(() => setshowLoader(false));
    }
  }, [modalToDo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {showLoader ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${modalToDo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setmodalOn(false);
                setmodalTodo(null);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {modalToDo?.title}
            </p>

            <p className="block" data-cy="modal-user">

              {
                modalToDo?.completed

                  ? (<strong className="has-text-success">Done</strong>)

                  : (<strong className="has-text-danger">Planned</strong>)
              }

              {' by '}

              <a href={`mailto:${currentUser?.email}`}>
                {currentUser?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
