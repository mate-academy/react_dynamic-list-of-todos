import React, { useEffect, useState } from "react";
import { Loader } from "../Loader";
import { Todo } from "../../types/Todo";
import { getUser } from "../../api";
import { User } from "../../types/User";

type Props = {
  todo: Todo;
  clearHandler: () => void;
};

export const TodoModal: React.FC<Props> = ({ todo, clearHandler }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let isActive = true;

    const load = async () => {
      setLoading(true);
      try {
        const u = await getUser(todo.userId);
        if (isActive) {
          setUser(u)
        };
      } finally {
        if (isActive) {
          setLoading(false);
        };
      }
    };

    load();

    return () => {
      isActive = false;
    };
  }, [todo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={clearHandler} />

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

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={clearHandler}
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
              {user ? <a href={`mailto:${user.email}`}>{user.name}</a> : '—'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
