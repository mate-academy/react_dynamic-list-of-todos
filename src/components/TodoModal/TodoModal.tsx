import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import classNames from 'classnames';

type Props = {
  currentModal: Todo;
  setCurrentModal: React.Dispatch<Todo>;
};

export const TodoModal: React.FC<Props> = ({
  currentModal,
  setCurrentModal,
}) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    setLoading(true);

    getUser(currentModal.userId)
      .then(setUser)
      .finally(() => setLoading(false));
  }, [currentModal]);

  return (
    <>
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />
        {loading && <Loader />}
        {!loading && (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #{currentModal.id}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() =>
                  setCurrentModal({
                    userId: 0,
                    id: 0,
                    title: '0',
                    completed: false,
                  })
                }
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {currentModal.title}
              </p>

              <p className="block" data-cy="modal-user">
                <strong
                  className={classNames({
                    'has-text-danger': !currentModal.completed,
                    'has-text-success': currentModal.completed,
                  })}
                >
                  {currentModal.completed ? 'Done' : 'Planned'}
                </strong>
                {' by '}
                <a href={user?.email}>{user?.name}</a>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
