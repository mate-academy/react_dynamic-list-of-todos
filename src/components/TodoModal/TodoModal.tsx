import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  modalShowId: number;
  setModalShowId: (value: number) => void;
  todos: Todo[];
};

export const TodoModal: React.FC<Props> = ({
  modalShowId,
  setModalShowId,
  todos,
}) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const todo = todos.find(cTodo => cTodo.id === modalShowId);

  useEffect(() => {
    if (todo) {
      getUser(todo.userId)
        .then(fUser => {
          setUser(fUser);
          setLoading(false);
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error('Ошибка при загрузке пользователя:', error);
        });
    }
  }, [todo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading ? (
        <Loader />
      ) : (
        todo &&
        user && (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo {`#${todo.id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => setModalShowId(0)}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo.title}
              </p>

              <p className="block" data-cy="modal-user">
                <strong className="has-text-danger">
                  {todo.completed ? `Done` : `Planned`}
                </strong>

                {' by '}

                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
};
