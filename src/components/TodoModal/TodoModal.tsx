import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getTodos, getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  selectId: number;
  onSelectedTodo: (id: number | null) => void;
};

export const TodoModal: React.FC<Props> = ({ selectId, onSelectedTodo }) => {
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingTodos, setLoadingTodos] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [todo, setTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoadingTodos(true);
    getTodos()
      .then(tds => {
        const td = tds.find(el => el.id === selectId) || null;

        setTodo(td);
      })
      .finally(() => setLoadingTodos(false));
  }, [selectId]);

  useEffect(() => {
    if (todo?.userId) {
      setLoadingUser(true);
      getUser(todo.userId)
        .then(setUser)
        .finally(() => setLoadingUser(false));
    }
  }, [todo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loadingUser || loadingTodos ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectId}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => onSelectedTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={
                  todo?.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {todo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
