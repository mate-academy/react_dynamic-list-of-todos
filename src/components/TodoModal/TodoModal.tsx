import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  setselectedtodo: (todo: Todo | null) => void;
  todo: Todo;
};

export const TodoModal: React.FC<Props> = ({ todo, setselectedtodo }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);

  const { id, title, completed, userId } = todo;

  useEffect(() => {
    setLoading(true);

    getUser(userId)
      .then(setUser)
      .finally(() => setLoading(false));
  }, [userId]);

  const deleteButtonHandler = () => setselectedtodo(null);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={() => setselectedtodo(null)} />

      {loading === true ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={deleteButtonHandler}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              {completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
