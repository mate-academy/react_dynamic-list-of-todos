import React, { useEffect, useState } from 'react';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

import { Loader } from '../Loader';
import { getUser } from '../../api';

type Props = {
  chosenTodo: Todo,
  handleChosenTodo: (arg: null) => void,
};

export const TodoModal: React.FC<Props> = ({
  chosenTodo,
  handleChosenTodo,
}) => {
  const [loader, setLoader] = useState<boolean>(true);
  const [modalUser, setModalUser] = useState<User | null>(null);

  const {
    id,
    title,
    completed,
    userId,
  } = chosenTodo;

  useEffect(() => {
    getUser(userId)
      .then((user) => {
        setModalUser(user);
      })
      .catch(() => new Error())
      .finally(() => setLoader(false));
  }, []);

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
              {`Todo #${id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => handleChosenTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              {modalUser
                ? (
                  <a href={`mailto:${modalUser.email}`}>
                    {modalUser.name}
                  </a>
                ) : (
                  <span>Sorry, user not found</span>
                )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
