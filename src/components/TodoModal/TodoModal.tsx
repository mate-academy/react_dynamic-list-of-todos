import React, { useState, useEffect, useContext } from 'react';
import cn from 'classnames';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { CurrentTodo } from '../../types/CurrentTodo';
import { Loader } from '../Loader';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

export const TodoModal: React.FC<Props> = ({ isVisible, onClose }) => {
  const [currentUser, setCurrentUser] = useState<User>({
    id: 0,
    name: '',
    email: '',
    phone: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { currentTodo } = useContext(CurrentTodo);

  useEffect(() => {
    setIsLoading(true);

    const findUser = () => {
      getUser(currentTodo.id)
        .then((prev: User) => setCurrentUser(prev))
        .finally(() => setIsLoading(false));
    };

    findUser();
  }, [currentTodo]);

  return (
    <div
      className={cn('modal', {
        'is-active': isVisible,
      })}
      data-cy="modal"
    >
      <div
        className={cn({
          'modal-background': isVisible,
        })}
      />

      {isLoading ? (
        <Loader />
      ) : (
        isVisible && (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {currentUser.id}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={onClose}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {currentTodo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {/* <strong className="has-text-success">Done</strong> */}
                <strong className="has-text-danger">Planned</strong>

                {' by '}

                <a href={`mailto:${currentUser.email}`}>{currentUser.name}</a>
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
};
