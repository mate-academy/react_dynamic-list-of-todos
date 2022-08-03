import React, { useEffect, useState } from 'react';
import { getTodo, getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  todoId: number;
  setShownTodoId: (value: number) => void;
};

export const TodoModal: React.FC<Props> = ({ todoId, setShownTodoId }) => {
  const [loading, setLoading] = useState(true);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadData = () => {
      getTodo(todoId).then(gottenTodo => {
        setTodo(gottenTodo);
        if (gottenTodo) {
          getUser(gottenTodo.userId)
            .then(gottenUser => setUser(gottenUser))
            .then(() => setLoading(false));
        }
      });
    };

    loadData();
  }, []);

  return (
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
              {`Todo #${todoId}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setShownTodoId(0)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

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
