import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type TodoModalProps = {
  todo: Todo;
  setSelectedTodo: Dispatch<SetStateAction<Todo | null>>;
};

export const TodoModal: React.FC<TodoModalProps> = ({
  todo,
  setSelectedTodo,
}) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>();
  // console.log({ selectedTodoId });

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const userFromServer = await getUser(todo.userId);

        setUser(userFromServer);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [todo.userId]);

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
              Todo #{todo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setSelectedTodo(null)}
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
      )}
    </div>
  );
};
