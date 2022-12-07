import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  selectedTodo: Todo,
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo>>,
  initialTodo: Todo;
  setShowTodoModal: React.Dispatch<React.SetStateAction<boolean>>,
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  setSelectedTodo,
  initialTodo,
  setShowTodoModal,
}) => {
  const initialUser = {} as User;
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    getUser(selectedTodo.userId)
      .then(response => setUser(response));
  }, [selectedTodo]);

  const handleClickDelete = () => {
    setShowTodoModal(false);
    setSelectedTodo(initialTodo);
  };

  const { name, email } = user;
  const { completed, id, title } = selectedTodo;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {Object.keys(user).length === 0 ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleClickDelete}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className="has-text-danger">
                {completed ? 'Done' : 'Planned'}
              </strong>
              {' by '}
              <a href={`mailto:${email}`}>
                {name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
