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
  loadStatus: string;
};

export const TodoModal: React.FC<Props> = React.memo(({
  user, todo, closeModal, loadStatus,
}) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loadStatus === 'isLoading' && <Loader />}

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{todo!.id}
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={closeModal}
          />
        </header>

        <div className="modal-card-body">
          {loadStatus === 'loaded' && (
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

                {' by '}

                <a href={user?.email}>
                  {user?.name}
                </a>
              </p>
            </>
          )}

          {loadStatus === 'error' && (
            <p>Error. Data not loaded</p>
          )}

        </div>
      </div>
    </div>
  );
});
