import React, { useEffect, useState } from "react";
import cn from "classnames";
import { Loader } from "../Loader";
import { Todo } from "../../types/Todo";
import { User } from "../../types/User";
import { getUser } from "../../api";

type Props = {
  todo: Todo;
  unsetTodo: () => void;
};

export const TodoModal: React.FC<Props> = React.memo(({ todo, unsetTodo }) => {
  const { id, title, userId, completed } = todo;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(userId).then(setUser);
  }, [userId]);

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
              {`Todo #${id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={unsetTodo}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={cn({
                  "has-text-danger": !completed,
                  "has-text-success": completed,
                })}
              >
                {completed ? "Done" : "Planned"}
              </strong>

              {" by "}

              <a href={`mailto:${user.email}`}>{user.name}</a>

            </p>
          </div>
        </div>
      )}
    </div>
  );
});
