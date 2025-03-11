import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';

type Props = {
  setSelectedId: (arg: number) => void;
  todoId: number;
  selectedToDo: Todo;
  setActiveModal: (arg: boolean) => void;
  activeModal: boolean;
};

export const TodoModal: React.FC<Props> = ({
  setSelectedId,
  selectedToDo,
  todoId,
  setActiveModal,
  activeModal,
}) => {
  const [closed, setClosed] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (activeModal) {
      setIsLoading(true);

      setTimeout(() => {
        getUser(selectedToDo.userId)
          .then(user => {
            setUserName(user.name);
            setUserEmail(user.email);
          })
          .catch(error => setUserName(`User not found: ${error}`))
          .finally(() => setIsLoading(false));
      }, 300);
    }
  }, [activeModal, selectedToDo.userId]);

  return (
    <div
      className={classNames('modal', {
        'is-active': !closed && todoId !== 0,
      })}
      data-cy="modal"
    >
      <div className="modal-background" />
      {/* selectedToDo ? 
        <Loader/>
        : */}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectedToDo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setSelectedId(0);
                setClosed(true);
                setActiveModal(false);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedToDo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={classNames({
                  'has-text-danger': !selectedToDo.completed,
                  'has-text-success': selectedToDo.completed,
                })}
              >
                {selectedToDo.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${userEmail}`}>{`${userName}`}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
