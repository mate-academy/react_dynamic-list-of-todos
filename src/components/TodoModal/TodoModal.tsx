/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-constant-condition */
import React from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  user: User | null;
  todo: Todo | null;
  closeModal: () => void;
  isError: boolean;
};

export const TodoModal: React.FC<Props> = React.memo(({
  user, todo, closeModal, isError,
}) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user && !isError && <Loader />}

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{todo!.id}
          </div>

          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={closeModal}
            aria-label="modal-close"
          />
        </header>

        <div className="modal-card-body">
          {user && !isError && (
            <>
              <p className="block" data-cy="modal-title">
                {todo!.title}
              </p>

              <p className="block" data-cy="modal-user">
                {
                  todo!.completed
                    ? (<strong className="has-text-success">Done</strong>)
                    : (<strong className="has-text-danger">Planned</strong>)
                }

                <span> by </span>

                <a href={user?.email}>
                  {user?.name}
                </a>
              </p>
            </>
          )}

          {isError && (
            <p>Error. Data not loaded</p>
          )}

        </div>
      </div>
    </div>
  );
});
