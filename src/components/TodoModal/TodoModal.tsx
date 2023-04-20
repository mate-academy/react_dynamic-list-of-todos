/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  selectedTodoId: number,
  closeModal: () => void,
};

export const TodoModal: React.FC<Props> = (
  {
    todos,
    selectedTodoId,
    closeModal,
  },
) => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const foundTodo = todos.find(todo => todo.id === selectedTodoId);

    if (foundTodo) {
      setSelectedTodo(foundTodo);
    }
  }, [selectedTodo]);

  useEffect(() => {
    if (selectedTodo) {
      getUser(selectedTodo.userId).then(setUser);
    }
  }, [selectedTodo]);
  {
    if (!user) {
      return <Loader />;
    }
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
            {`Todo #${selectedTodo?.id}`}
          </div>

          <button
            type="button"
            onClick={closeModal}
            className="delete"
            data-cy="modal-close"
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {selectedTodo?.title}
          </p>

          <p className="block" data-cy="modal-user">
            <strong className="has-text-danger">
              {user && `Planned by ${user.name}`}
            </strong>

            {' by '}

            <a href="mailto:Sincere@april.biz">
              {user.email}
            </a>
          </p>
        </div>
      </div>

    </div>

  );
};
