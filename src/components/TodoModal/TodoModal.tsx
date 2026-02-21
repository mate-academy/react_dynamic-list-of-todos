import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  selectedId: number;
  onSelectedId: () => void;
};

export const TodoModal = ({ selectedId, onSelectedId, todos }: Props) => {
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const currTodo = todos.find(t => t.id === selectedId);

  useEffect(() => {
    if (currTodo?.userId) {
      getUser(currTodo?.userId)
        .then((u: User) => setUser(u))
        .finally(() => setLoader(false));
    }
  }, [selectedId, currTodo?.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loader ? (
        <Loader />
      ) : (
        user &&
        currTodo && (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${currTodo.id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={onSelectedId}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {currTodo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {/* <strong className="has-text-success">Done</strong> */}
                <strong
                  className={classNames({
                    'has-text-success': currTodo.completed,
                    'has-text-danger': !currTodo.completed,
                  })}
                >
                  {currTodo.completed ? 'Done' : 'Planned'}
                </strong>

                {' by '}

                <a href={user.email}>{user.name}</a>
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
};
