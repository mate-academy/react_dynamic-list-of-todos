import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  selectedId: Todo | null
  closeTodosUser: () => void
};

export const TodoModal: React.FC<Props> = ({ selectedId, closeTodosUser }) => {
  const [user, setUser] = useState<User | null>(null);

  const handleUser = async () => {
    const userFetch = await getUser(selectedId?.userId || 0);

    setUser(userFetch);
  };

  useEffect(() => {
    handleUser();
  }, []);

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
              {`Todo #${selectedId?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeTodosUser}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedId?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {
                !selectedId?.completed
                  ? <strong className="has-text-danger">Planned</strong>
                  : <strong className="has-text-success">Done</strong>
              }
              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

/* <div className="modal-card">
  <header className="modal-card-head">
    <div
      className="modal-card-title has-text-weight-medium"
      data-cy="modal-header"
    >
      Todo #2
    </div>

    eslint-disable-next-line jsx-a11y/control-has-associated-label
    <button
      type="button"
      className="delete"
      data-cy="modal-close"
    />
  </header>

  <div className="modal-card-body">
    <p className="block" data-cy="modal-title">
      quis ut nam facilis et officia qui
    </p>

    <p className="block" data-cy="modal-user">
      <strong className="has-text-success">Done</strong>
      <strong className="has-text-danger">Planned</strong>

      by

      <a href="mailto:Sincere@april.biz">
        Leanne Graham
      </a>
    </p>
  </div>
</div>
 */
