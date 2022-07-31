import { FC, useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  onClose(state: Todo | null): void,
  todo: Todo,
};

export const TodoModal: FC<Props> = ({ onClose, todo }) => {
  const [userOfTodo, setUserOfTodo] = useState<User>();

  useEffect(() => {
    getUser(todo.userId).then((user) => {
      setUserOfTodo(user);
    });
  }, []);

  return (
    <div className="modal is-active">
      <div className="modal-background" />

      {!userOfTodo
        ? <Loader />
        : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div className="modal-card-title has-text-weight-medium">
                {`Todo #${todo.id}`}
              </div>
              <a
                href="#close"
                className="delete"
                onClick={() => onClose(null)}
              >
                Close
              </a>
            </header>

            <div className="modal-card-body">
              <p className="block">
                {todo.title}
              </p>

              <p className="block">
                {todo.completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>}
                {' by '}
                <a href={`mailto:${userOfTodo.email}`}>
                  {userOfTodo.name}
                </a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
