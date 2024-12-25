import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  todos: Todo[];
  select: number;
  setSelect: (select: number) => void;
};

export const TodoModal: React.FC<Props> = ({ todos, select, setSelect }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>();

  const selectedTodo = todos.find(todo => todo.id === select);
  const foundedUserId = selectedTodo?.userId;

  useEffect(() => {
    setLoading(true);

    if (foundedUserId) {
      getUser(foundedUserId)
        .then(userFromServer => setUser(userFromServer))
        .finally(() => setLoading(false));
    }
  }, [foundedUserId]);

  return (
    <div className="modal is-active" data-cy="modal">
      {select !== 0 && <div className="modal-background" />}

      {loading ? (
        <Loader />
      ) : (
        todos.map(
          todo =>
            select === todo.id && (
              <div className="modal-card" key={todo.id}>
                <header className="modal-card-head">
                  <div
                    className="modal-card-title has-text-weight-medium"
                    data-cy="modal-header"
                  >
                    {`Todo #${todo.id}`}
                  </div>

                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    type="button"
                    className="delete"
                    data-cy="modal-close"
                    onClick={() => setSelect(0)}
                  />
                </header>

                <div className="modal-card-body">
                  <p className="block" data-cy="modal-title">
                    {todo.title}
                  </p>

                  <p className="block" data-cy="modal-user">
                    {todo.completed ? (
                      <strong className="has-text-success">Done</strong>
                    ) : (
                      <strong className="has-text-danger">Planned</strong>
                    )}

                    {' by '}

                    <a href={`mailto:${user?.email}`}>{user?.name}</a>
                  </p>
                </div>
              </div>
            ),
        )
      )}
    </div>
  );
};
