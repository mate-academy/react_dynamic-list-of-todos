import React from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';

type Propse = {
  user: User | null,
  idTodo: number,
  titleTodo: string,
  onRemoveModal: (value: boolean) => void
};

export const TodoModal: React.FC<Propse> = ({
  user,
  idTodo,
  titleTodo,
  onRemoveModal,
}) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${idTodo}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => onRemoveModal(false)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {titleTodo}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className="has-text-danger">Planned</strong>

              {' by '}

              <a href="mailto:Sincere@april.biz">
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
