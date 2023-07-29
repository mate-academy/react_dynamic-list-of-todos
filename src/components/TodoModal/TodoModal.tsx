import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  loaderTodo: boolean
  selectedTodo: User
  todoUser:Todo | null
  setSelectedTodo: (result: User | null) => void
  setTodoUser: (result: Todo | null) => void;
};

export const TodoModal: React.FC<Props> = (
  {
    loaderTodo,
    selectedTodo,
    todoUser,
    setSelectedTodo,
    setTodoUser,
  },
) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loaderTodo && <Loader />}

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #
            {todoUser && todoUser.id}
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={() => {
              setSelectedTodo(null);
              setTodoUser(null);
            }}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {todoUser && todoUser.title}
          </p>

          <p className="block" data-cy="modal-user">
            {/* <strong className="has-text-success">Done</strong> */}
            <strong className="has-text-danger">Planned</strong>

            {' by '}

            <a href={selectedTodo.email}>
              {selectedTodo.name}
            </a>
          </p>
        </div>
      </div>

    </div>
  );
};
