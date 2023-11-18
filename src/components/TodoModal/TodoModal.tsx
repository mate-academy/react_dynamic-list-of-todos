import React, { useContext, useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { FilterContext } from '../Contex/FilterContex';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User>();
  const [loaderOn, setLoaderOn] = useState(false);
  const { filter, setFilter } = useContext(FilterContext);
  const { todo } = filter;

  useEffect(() => {
    setLoaderOn(true);
    getUser(todo.userId)
      .then(setUser)
      .finally(() => setLoaderOn(false));
  }, [todo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loaderOn ? <Loader />
        : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${todo.id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => (setFilter((item) => ({
                  ...item,
                  modalOn: false,
                })))}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {todo.completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>}

                {' by '}

                <a href={`mailto:${user?.email}`}>
                  {user?.name}
                </a>
              </p>
            </div>
          </div>
        ) }

    </div>
  );
};
