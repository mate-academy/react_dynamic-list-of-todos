import React, { useContext } from 'react';
import { Loader } from '../Loader';
import { ButtonContext } from '../../context/ButtonContext';
import { TodoContext } from '../../context/TodoContext';

export const TodoModal: React.FC = () => {
  const { isPressed, setIsPressed } = useContext(ButtonContext);
  const { todo, setTodo } = useContext(TodoContext);

  function handleCloseButton() {
    setIsPressed(false);
    setTodo({
      id: 0,
      title: '',
      completed: false,
      userId: 0,
      user: undefined,
    });
  }

  return (
    <>
      {isPressed && (
        <div className="modal is-active" data-cy="modal">
          <div className="modal-background" />

          {todo.user === undefined ? (
            <Loader />
          ) : (
            <div className="modal-card">
              <header className="modal-card-head">
                <div
                  className="modal-card-title has-text-weight-medium"
                  data-cy="modal-header"
                >
                  Todo #{todo.id}
                </div>

                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  type="button"
                  className="delete"
                  data-cy="modal-close"
                  onClick={handleCloseButton}
                />
              </header>

              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {todo.title}
                </p>

                <p className="block" data-cy="modal-user">
                  {/* <strong className="has-text-success">Done</strong> */}
                  <strong
                    className={`${todo.completed ? 'has-text-success' : 'has-text-danger'}`}
                  >
                    {todo.completed ? 'Done' : 'Planned'}
                  </strong>

                  {' by '}

                  <a href={`mailto:${todo.user?.email}`}>{todo.user?.name}</a>
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
