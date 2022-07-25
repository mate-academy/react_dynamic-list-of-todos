import { FC, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  todo: Todo | null;
  closeModalHandler: () => void;
};

export const TodoModal: FC<Props> = ({ todo, closeModalHandler }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function retrieveUser() {
      if (todo) {
        const res = await getUser(todo.userId);

        setUser(res);
      }

      setLoading(false);
    }

    retrieveUser();
  }, [user]);

  return (
    <div className="modal is-active">
      <div className="modal-background" />

      {loading && <Loader /> }

      {!loading && user && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div className="modal-card-title has-text-weight-medium">
              Todo&nbsp;#
              {todo?.id}
            </div>
            <a
              href="#close"
              className="delete"
              onClick={closeModalHandler}
            >
              Close
            </a>
          </header>

          <div className="modal-card-body">
            <p className="block">{todo?.title}</p>

            <p className="block">
              {todo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
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
