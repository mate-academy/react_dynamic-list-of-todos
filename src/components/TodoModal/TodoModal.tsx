import React, { useContext, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { TodoContext } from '../../context/todocontext';
import { getUser } from '../../api';
import { User } from '../../types/User';
import classNames from 'classnames';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | undefined>(undefined)

  const context = useContext(TodoContext)

  const { showModal, filtred, handleModalClick, todoId, handleIsLoading, isLoadingModal, userId } = context

useEffect(() => {
  if (!userId) return;

  const timer = setTimeout(() => {
    getUser(userId)
      .then(setUser)
      .finally(() => handleIsLoading(false)); // desliga loader só depois da requisição
  }, 1000);

  return () => clearTimeout(timer);
}, [userId, handleIsLoading]);

console.log('user', user)

  const todoFilter = filtred.map((f) => {
    if (f.userId === user?.id && f.id === todoId) {
      return f.title
    } else {
      null
    }
  })
  const todoPlanner = filtred.some((f) => {
    if (f.userId === user?.id && f.id === todoId && f.completed === true) {
      return true
    } else {
      return false
    }
  })



  return (
    <>
      {!showModal && (<div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
        <div className="modal-card">\
          {isLoadingModal ? (
            <Loader />) : (
              <>
             <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            {`Todo #${todoId}`}
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button type="button" className="delete" data-cy="modal-close" onClick={() => handleModalClick(true)} />
        </header>


            <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
                    {todoFilter}

          </p>

          <p className="block" data-cy="modal-user">
            {/* <strong className="has-text-success">Done</strong> */}
                    <strong className={classNames({
                      "has-text-danger": !todoPlanner,
                      "has-text-success": todoPlanner
                    })}>{todoPlanner ? 'Done' : 'Planned'}</strong>

            {' by '}

            <a href={`mailto:${user?.email}`}>{user?.name}</a>
          </p>
        </div>

              </>
            )}
      </div>
      </div>
    )}
    </>
  );
};
