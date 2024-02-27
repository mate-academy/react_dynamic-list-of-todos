import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  todoInfo: Todo | null;
  setTodoInfo: React.Dispatch<React.SetStateAction<Todo | null>>;
};

export const TodoModal: React.FC<Props> = ({ todoInfo, setTodoInfo }) => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    setLoading(true);

    if (todoInfo) {
      getUser(todoInfo.userId)
        .then(setUserInfo)
        .finally(() => setLoading(false));
    }
  }, [todoInfo]);

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
              Todo #{todoInfo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setTodoInfo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todoInfo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todoInfo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href="mailto:Sincere@april.biz">{userInfo?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
