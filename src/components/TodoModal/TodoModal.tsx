import React, { useEffect, useState } from 'react';

import { User } from '../../types/User';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';

type Props = {
  selectTodo: Todo;
  setselectTodo: (todo: Todo | null) => void;
};

export const TodoModal: React.FC<Props> = ({ selectTodo, setselectTodo }) => {
  const handleDeleteBtn = () => {
    setselectTodo(null);
  };

  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUser(selectTodo.userId)
      .then(usersFromServer => {
        setUser(usersFromServer);
      })
      .finally(() => setLoading(false));
  }, [selectTodo.userId]);

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
              Todo #{selectTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleDeleteBtn}
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

              <a href="mailto:Sincere@april.biz">{user && user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
