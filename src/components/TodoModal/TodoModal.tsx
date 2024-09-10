import React, { useEffect, useContext } from 'react';
import { Loader } from '../Loader';
import { DispatchContext, StateContext } from '../../store/Store';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const { selectedTodo, targetUserInfo, loading } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    if (selectedTodo.id !== 0) {
      dispatch({ type: 'SET_LOADING', payload: true });

      getUser(selectedTodo.todo[0].userId)
        .then(user => {
          dispatch({ type: 'SET_TARGET_USER', payload: user });
          dispatch({ type: 'SET_LOADING', payload: false });
        })
        .catch(() => {
          dispatch({ type: 'SET_LOADING', payload: false });
        });
    }
  }, [selectedTodo.id, dispatch, selectedTodo.todo]);

  return (
    <>
      {selectedTodo.id !== 0 && (
        <div className="modal is-active" data-cy="modal">
          <div className="modal-background" />

          {loading ? (
            <Loader />
          ) : (
            <div className="modal-card">
              <header className="modal-card-head">
                <div
                  className="modal-card-title has-text-weight-medium"
                  data-cy="modal-header"
                >
                  {`Todo #${selectedTodo.id}`}
                </div>

                <button
                  type="button"
                  className="delete"
                  data-cy="modal-close"
                  onClick={() => {
                    dispatch({ type: 'SET_SELECTED', payload: 0 });
                  }}
                />
              </header>

              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {selectedTodo.todo[0].title}
                </p>

                <p className="block" data-cy="modal-user">
                  {!selectedTodo.todo[0].completed ? (
                    <strong className="has-text-danger">Planned</strong>
                  ) : (
                    <strong className="has-text-success">Done</strong>
                  )}

                  {' by '}

                  <a href={`mailto:${targetUserInfo?.email}`}>
                    {targetUserInfo?.name}
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
