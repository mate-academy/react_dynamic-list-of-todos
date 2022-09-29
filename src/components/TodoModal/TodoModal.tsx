import { FC, useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';

type Props = {
  todoId: number;
  todos: Todo[];
  selectTodo: (id: number) => void;
};

export const TodoModal: FC<Props> = ({
  todoId,
  todos,
  selectTodo,
}) => {
  const [modal, setModal] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const currentTodo = todos.find(({ id }) => id === todoId);

  useEffect(() => {
    if (currentTodo) {
      getUser(currentTodo.userId)
        .then((response) => {
          setUser(response);
        });
    }
  }, []);

  if (!modal) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user
        ? <Loader />
        : (
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
                onClick={() => {
                  setModal(false);
                  selectTodo(0);
                }}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {currentTodo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                {currentTodo?.completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>}

                {' by '}

                <a href={`mailto:${user.email}`}>
                  {user.name}
                </a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
