import React from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  todo: Todo | null;
  setModal: (v: boolean) => void;
};
export const TodoModal: React.FC<Props> = ({ todo, setModal }) => {
  const [curentUser, setCurentUser] = React.useState<User>();
  const [loading, setLoading] = React.useState<boolean>(true);

  getUser(todo?.userId || 0)
    .then((user) => {
      setLoading(false);
      setCurentUser(user);
    });

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading ? (
        <Loader />
      ) : (
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
              onClick={() => setModal(false)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <>
                {todo?.completed && (
                  <strong className="has-text-success">Done</strong>
                )}
                {!todo?.completed && (
                  <strong className="has-text-danger">Planned</strong>
                )}
              </>

              {' by '}

              <a href="mailto:Sincere@april.biz">
                {curentUser?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
