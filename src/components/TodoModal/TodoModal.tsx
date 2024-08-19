import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  choiceTodo: Todo | null;
  setChoiceTodo: (choiceTodo: Todo | null) => void;
};

export const TodoModal: React.FC<Props> = ({ choiceTodo, setChoiceTodo }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (choiceTodo?.userId) {
      getUser(choiceTodo?.userId)
        .then(userFromServer => {
          setUser(userFromServer);
        })
        .finally(() => setLoading(false));
    }
  }, [choiceTodo?.userId]);

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
              Todo #{choiceTodo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setChoiceTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {choiceTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {choiceTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href="mailto:Sincere@april.biz">{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
