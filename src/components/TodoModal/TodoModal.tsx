import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';

interface PropsModal {
  setSelectedTodo: Dispatch<SetStateAction<Todo | null>>;
  selectedTodo: Todo;
}

export const TodoModal: React.FC<PropsModal> = ({
  setSelectedTodo,
  selectedTodo,
}) => {
  const [todoUser, setTodoUser] = useState<User>();

  useEffect(() => {
    if (selectedTodo) {
      getUser(selectedTodo.userId).then(data => {
        setTodoUser(data);
      });
    }
  }, [selectedTodo]);

  const handlerModalClose = () => {
    setSelectedTodo(null);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {selectedTodo && todoUser ? (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectedTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handlerModalClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              {selectedTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={todoUser?.email}>{todoUser?.name}</a>
            </p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
