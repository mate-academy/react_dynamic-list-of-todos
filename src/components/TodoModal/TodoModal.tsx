import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  targetUserId: number;
  setTargetUserId: (num: number) => void;
  settargetRowId: (num: number) => void;
  targetTodo: Todo | undefined;
};

export const TodoModal: React.FC<Props> = ({
  targetUserId,
  setTargetUserId,
  settargetRowId,
  targetTodo,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(targetUserId).then(person => setUser(person));
  }, []);

  const hendleClick = () => {
    setTargetUserId(0);
    setUser(null);
    settargetRowId(0);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user && targetTodo ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${targetTodo?.id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={hendleClick}
            >
              {}
            </button>
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {targetTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {
                targetTodo?.completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>
              }

              {' by '}

              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
