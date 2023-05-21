import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';

interface TodoModalProps {
  selectedTodo: Todo,
  unselectedTodo: () => void,
}

export const TodoModal: React.FC<TodoModalProps>
= ({ selectedTodo, unselectedTodo }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(selectedTodo.userId).then(setUser);
  }, [selectedTodo]);

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
              {`Todo #${selectedTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={unselectedTodo}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className={cn({
                'has-text-danger': !selectedTodo.completed,
                'has-text-success': selectedTodo.completed,
              })}
              >
                {`${selectedTodo.completed ? 'Done' : 'Planned'}`}

              </strong>

              {' by '}

              <a href="mailto:Sincere@april.biz">
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
