import React, { useContext, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { DispatchContext, StateContext } from '../../Store';
import classNames from 'classnames';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const { todoInPopup } = useContext(StateContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isPopup, setIsPopup] = useState(false);
  const dispatch = useContext(DispatchContext);
  const [todoUser, setTodoUser] = useState<User | null>(null);

  useEffect(() => {
    if (todoInPopup !== null) {
      setIsPopup(true);
      setIsLoading(true);
      getUser(todoInPopup.userId)
        .then(user => {
          return setTodoUser(user);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [dispatch, todoInPopup]);

  const handleClosePopup = () => {
    setIsPopup(false);
    dispatch({
      type: 'resetPopupTodo',
    });
  };

  return (
    <>
      {isPopup && (
        <div
          className={classNames('modal', {
            'is-active': isPopup,
          })}
          data-cy="modal"
        >
          <div className="modal-background" />

          {isLoading ? (
            <Loader />
          ) : (
            todoInPopup && (
              <div className="modal-card">
                <header className="modal-card-head">
                  <div
                    className="modal-card-title has-text-weight-medium"
                    data-cy="modal-header"
                  >
                    Todo #{todoInPopup.id}
                  </div>

                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    type="button"
                    className="delete"
                    data-cy="modal-close"
                    onClick={handleClosePopup}
                  />
                </header>

                <div className="modal-card-body">
                  <p className="block" data-cy="modal-title">
                    {todoInPopup.title}
                  </p>

                  <p className="block" data-cy="modal-user">
                    {/* <strong className="has-text-success">Done</strong> */}
                    {todoInPopup.completed ? (
                      <strong className=" has-text-success">Done</strong>
                    ) : (
                      <strong className="has-text-danger">Planned</strong>
                    )}

                    {' by '}

                    {todoUser && (
                      <a href={`mailto:${todoUser.email}`}>{todoUser.name}</a>
                    )}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </>
  );
};
