import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  selectedTodoId: number;
  todos: Todo[];
  selectTodo: (id: number | null) => void;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodoId, todos, selectTodo,
}) => {
  const [someTodo] = useState(
    todos.find((todo) => todo.id === selectedTodoId),
  );
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUser(someTodo?.userId || 0)
      .then((userFromList) => {
        setUser(userFromList);
      });
  }, []);

  const handleWindowClose = () => {
    selectTodo(null);
  };

  return (
    <div
      className="modal is-active"
      data-cy="modal"
    >
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div
          className="modal-card"
        >
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${someTodo?.id}`}
            </div>

            <button
              type="button"
              aria-label="Close window"
              className="delete"
              data-cy="modal-close"
              onClick={handleWindowClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {someTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className={classNames(
                { 'has-text-success': someTodo?.completed },
                { 'has-text-danger': !someTodo?.completed },
              )}
              >
                {someTodo?.completed ? 'Done' : 'Planned'}
              </strong>

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
