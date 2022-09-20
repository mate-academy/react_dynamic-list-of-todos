import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  todos: Todo[];
  selectTodo: (value: number) => number | void;
  selectedTodoId: number;
};

export const TodoModal: React.FC<Props> = ({
  todos,
  selectTodo,
  selectedTodoId,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const foundTodo = todos.find(todo => todo.id === selectedTodoId);

  useEffect(() => {
    if (foundTodo) {
      getUser(foundTodo.userId)
        .then(response => setUser(response));
    }
  }, []);

  const handleSelect = () => {
    selectTodo(0);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodoId}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleSelect}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {foundTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {foundTodo?.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
