import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  filteredTodos: Todo[],
  modalView: number,
  setModalView: React.Dispatch<React.SetStateAction<number>>,
};

function findTodoByID(todos: Todo[], id: number) {
  return todos.find(todo => todo.id === id)
    || null;
}

export const TodoModal: React.FC<Props> = ({
  filteredTodos,
  modalView,
  setModalView,
}) => {
  const [user, setUsers] = useState<User>();
  const [loading, setLoading] = useState(false);
  const todo = findTodoByID(filteredTodos, modalView);

  useEffect(() => {
    setLoading(true);
    if (todo) {
      getUser(todo.userId)
        .then(setUsers)
        .finally(() => setLoading(false));
    }
  }, [modalView]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading ? <Loader />
        : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${todo?.id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => setModalView(0)}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                {/* <strong className="has-text-success">Done</strong> */}
                <strong className={classNames({
                  'has-text-danger': !todo?.completed,
                  'has-text-success': todo?.completed,
                })}
                >
                  {todo?.completed
                    ? 'Done'
                    : 'Planned'}
                </strong>

                {' by '}

                <a href="mailto:Sincere@april.biz">
                  {user?.name}
                </a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
