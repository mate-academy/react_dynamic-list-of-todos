import { useEffect, useState } from 'react';
import classnames from 'classnames';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

interface Props {
  setModalOn: (state: boolean) => void;
  currentTodo: Todo;
  modalOn: boolean;
}

export const TodoModal: React.FC<Props> = ({
  modalOn,
  setModalOn,
  currentTodo,
}) => {
  const [currentUser, setCurrentUser] = useState<User>({
    name: 'no user',
    id: 0,
    email: 'no email',
    phone: 'no phone',
  });

  useEffect(() => {
    getUser(currentTodo.userId)
      .then(json => {
        setCurrentUser(json);
      });
  }, []);

  return (
    <div
      className={classnames('modal', { 'is-active': modalOn })}
      data-cy="modal"
    >
      <div className="modal-background" />

      {currentUser.id === 0 ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setModalOn(false)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}
              {' by '}

              <a href={`mailto:${currentUser.email}`}>
                {currentUser.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
