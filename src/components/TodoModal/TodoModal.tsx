import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getTodos, getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  userId: number;
  todoId: number;
  fnSelectTodo: (selectTodoId: number) => void;
};

export const TodoModal: React.FC<Props> = (
  {
    userId,
    todoId,
    fnSelectTodo,
  },
) => {
  const [user, setUser] = useState<User | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);

  const loadData = async () => {
    await Promise.all([
      getUser(userId).then(currentUser => setUser(currentUser)),
      getTodos().then(myTodos => setTodos(myTodos)),
    ]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          {todos.map(({
            id,
            title,
            completed,
          }) => (
            id === todoId
            && (
              <>
                <header className="modal-card-head">
                  <div
                    className="modal-card-title has-text-weight-medium"
                    data-cy="modal-header"
                  >
                    Todo #
                    {id}
                  </div>

                  <button
                    type="button"
                    aria-label="Mute volume"
                    className="delete"
                    data-cy="modal-close"
                    onClick={() => fnSelectTodo(0)}
                  />
                </header>

                <div className="modal-card-body">
                  <p className="block" data-cy="modal-title">
                    {title}
                  </p>

                  <p className="block" data-cy="modal-user">
                    {completed ? (
                      <strong className="has-text-success">Done</strong>)
                      : (
                        <strong className="has-text-danger">Planned</strong>
                      )}

                    {' by '}

                    <a href={`mailto:${user.email}`}>
                      {user.name}
                    </a>
                  </p>
                </div>
              </>
            )
          ))}
        </div>
      )}
    </div>
  );
};
