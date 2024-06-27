import React, { useEffect, useState } from 'react';

import { User } from '../../types/User';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';

type Props = {
  selectTodos: Todo;
  setSelectTodos: (todo: Todo | null) => void;
};

export const TodoModal: React.FC<Props> = ({ selectTodos, setSelectTodos }) => {
  const [users, setUsers] = useState<User | undefined>();
  const [isClosed, setIsClosed] = useState(true);

  useEffect(() => {
    getUser(selectTodos.userId).then(usersFromServer => {
      setUsers(usersFromServer);
    });
  }, [selectTodos.userId]);

  useEffect(() => {
    setIsClosed(false);
  }, [selectTodos]);

  const handleDeleteBtn = () => {
    setIsClosed(true);
    setSelectTodos(null);
  };

  return !isClosed ? (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!users ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectTodos.id}
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
              {selectTodos.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectTodos.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href="mailto:Sincere@april.biz">{users && users.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  ) : (
    <></>
  );
};
