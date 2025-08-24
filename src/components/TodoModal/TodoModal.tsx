import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  selectedTodo: number;
  onClose: (selectedTodo: number) => void;
};

export const TodoModal: React.FC<Props> = ({
  todos,
  selectedTodo,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const todo = todos.find(t => t.id === selectedTodo);

  useEffect(() => {
    if (!todo) {
      setUser(null);
      setLoading(false);

      return;
    }

    setUser(null);
    setLoading(true);

    getUser(todo.userId)
      .then(setUser)
      .finally(() => {
        setLoading(false);
      });
  }, [todo]);

  return (
    todo && (
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
                Todo #{todo.id}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => {
                  onClose(0);
                  setUser(null);
                }}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {/* <strong className="has-text-success">Done</strong> */}
                <strong
                  className={classNames({
                    'has-text-danger': !todo.completed,
                    'has-text-success': todo.completed,
                  })}
                >
                  {todo.completed ? 'Done' : 'Planned'}
                </strong>

                {' by '}

                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            </div>
          </div>
        )}
      </div>
    )
  );
};
