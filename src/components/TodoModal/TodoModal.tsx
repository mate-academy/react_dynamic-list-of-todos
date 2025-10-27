import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  selectTodo: Todo;
  handledeleteSelect: () => void;
};

export const TodoModal: React.FC<Props> = ({
  selectTodo,
  handledeleteSelect,
}) => {
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setLoader(true);
    setUser(null);

    getUser(selectTodo.userId)
      .then(setUser)
      // eslint-disable-next-line no-console
      .catch(e => console.error(e))
      .finally(() => setLoader(false));
  }, [selectTodo]);

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
              Todo #{selectTodo.id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handledeleteSelect}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectTodo.completed ? (
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
