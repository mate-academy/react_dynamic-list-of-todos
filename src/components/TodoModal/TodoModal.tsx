import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { getUser } from '../../api';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  modal: Todo | null;
  setModal: React.Dispatch<React.SetStateAction<Todo | null>>
};

export const TodoModal: React.FC<Props> = ({ modal, setModal }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUser(modal?.userId).then(setUser)
      .finally(() => setLoading(false));
  }, [modal]);

  return (
    <>
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />

        {loading
          ? <Loader />
          : (
            <div className="modal-card">
              <header className="modal-card-head">
                <div
                  className="modal-card-title has-text-weight-medium"
                  data-cy="modal-header"
                >
                  {`Todo #${modal?.id}`}
                </div>

                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  type="button"
                  className="delete"
                  data-cy="modal-close"
                  onClick={() => setModal(null)}
                />
              </header>
              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {modal?.title}
                </p>

                <p className="block" data-cy="modal-user">
                  {/* <strong className="has-text-success">Done</strong> */}
                  <strong className={classNames({
                    'has-text-danger': !modal?.completed,
                    'has-text-success': modal?.completed,
                  })}
                  >
                    {modal?.completed
                      ? 'Done'
                      : 'Planned'}
                  </strong>

                  {' by '}

                  <a href="mailto:Sincere@april.biz">
                    {user?.name}
                  </a>
                </p>
              </div>
            </div>
          )}
      </div>
    </>
  );
};
