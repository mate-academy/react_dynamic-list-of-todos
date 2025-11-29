import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  todo: Todo,
  onClose: () => void,
}


export const TodoModal: React.FC<Props> = ({ todo, onClose }) => {

  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [userError, setUserError] = useState(false);

  useEffect(() => {
    setIsUserLoading(true);
    getUser(todo.userId)

    .then(userFromServer => {
      setUser(userFromServer)
      setIsUserLoading(false)
    })

    .catch(error => {
      setUserError(true);
      setIsUserLoading(false);
    })
  },[todo])


if(isUserLoading || !user) {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
     <Loader />
     </div>
  );
}
    return (
      <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button type="button" className="delete" data-cy="modal-close" onClick={() => onClose()}/>
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className={todo.completed ? 'has-text-success' : 'has-text-danger'}>
              {todo.completed ? 'Done' : 'Not done'}
              </strong>

              {' by '}

              <a href={`mailto:${user.email}`}>
               {user.name}
                </a>
            </p>
          </div>
        </div>
        </div>
    )
  }
