import { SetStateAction, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  infoTodo: Todo;
  setInfoTodo: React.Dispatch<SetStateAction<Todo | null>>;
};

export const TodoModal: React.FC<Props> = ({ infoTodo, setInfoTodo }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUser(infoTodo?.userId)
      .then(setUser)
      .finally(() => setLoading(true));
  }, [infoTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      {loading ? (
        <>
          <div className="modal-background" />
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #{infoTodo.id}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => setInfoTodo(null)}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {infoTodo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {infoTodo.completed ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}

                {' by '}

                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};
