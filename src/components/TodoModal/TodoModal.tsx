import React from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  user: User,
  setUser: React.Dispatch<React.SetStateAction<User>>

  todos: Todo[],

  selectedTodoId: number | null
};

export const TodoModal: React.FC<Props> = ({
  user, setUser, todos, selectedTodoId,
}) => {
  const handleDeleteUser = () => {
    setUser({
      id: 0,
      name: '',
      email: '',
      phone: '',
    });
  };

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId) || null;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!selectedTodo ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {selectedTodo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => handleDeleteUser()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className={classNames({
                'has-text-success': selectedTodo?.completed,
                'has-text-danger': selectedTodo?.completed === false,
              })}
              >
                {selectedTodo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
