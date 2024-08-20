import React, { useEffect } from 'react';
import { Loader } from '../Loader';

import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

import classNames from 'classnames';

interface Props {
  todo: Todo | null;
  closeModalWindow?: () => void;
}

export const TodoModal: React.FC<Props> = ({
  todo,
  closeModalWindow = () => {},
}) => {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<User | null>(null);

  const loadUser = async () => {
    if (!todo?.userId) {
      return;
    }

    const chosenUser = await getUser(todo?.userId);

    setUser(chosenUser);

    setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, [todo?.userId]);

  return (
    <>
      {todo && (
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
                  Todo #{todo?.id}
                </div>

                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  type="button"
                  className="delete"
                  data-cy="modal-close"
                  onClick={closeModalWindow}
                />
              </header>

              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {todo.title}
                </p>

                <p className="block" data-cy="modal-user">
                  {/* <strong className="has-text-success">Done</strong> */}
                  <strong
                    className={classNames(
                      todo.completed ? 'has-text-success' : 'has-text-danger',
                    )}
                  >
                    {todo.completed ? 'Done' : 'Planned'}
                  </strong>

                  {' by '}

                  <a href="mailto:Sincere@april.biz">{user?.name}</a>
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
