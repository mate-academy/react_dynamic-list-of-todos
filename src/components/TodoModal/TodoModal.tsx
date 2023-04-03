import { FC, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

interface Props {
  todo: Todo,
  onClose: React.Dispatch<React.SetStateAction<Todo | null>>,
}

export const TodoModal: FC<Props> = ({ todo, onClose }) => {
  const [userDetails, setUserDetails] = useState<User>();

  useEffect(() => {
    getUser(todo.userId)
      .then(setUserDetails);
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {userDetails
        ? (
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
                onClick={() => onClose(null)}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo.title}
              </p>

              <p className="block" data-cy="modal-user">
                <strong className="has-text-danger">
                  {todo.completed ? 'Done' : 'Planned'}
                </strong>

                {' by '}

                <a href={userDetails.email}>
                  {userDetails.name}
                </a>
              </p>
            </div>
          </div>
        )
        : <Loader />}
    </div>
  );
};
