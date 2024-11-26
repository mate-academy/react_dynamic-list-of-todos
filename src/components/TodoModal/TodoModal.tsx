import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';

interface Props {
  selectedTodo: Todo;
  setSelectedTodo: React.Dispatch<React.SetStateAction<'' | Todo>>;
}

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  setSelectedTodo,
}) => {
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const { userId, title, completed, id } = selectedTodo;

  useEffect(() => {
    setLoader(true);

    getUser(userId).then(data => {
      setUser(data);
      setLoader(false);
    });
  }, [userId]);

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
              {`Todo #${id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setSelectedTodo('');
                setUser(null);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={completed ? 'has-text-success' : 'has-text-danger'}
              >
                {completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user ? user.email : 'unavailable'}`}>
                {user ? user.name : 'unavailable'}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
