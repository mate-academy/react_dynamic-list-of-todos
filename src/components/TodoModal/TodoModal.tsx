import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  todo: Todo | null;
  onCheck: (todo: Todo | null) => void;
};

export const TodoModal: React.FC<Props> = ({ todo, onCheck }) => {
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUser(todo?.userId || 0)
      .then(setUser)
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
              {todo && `Todo #${todo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => onCheck(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo && todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo && todo.completed ? (
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
