import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { TodosContext } from '../../TodosContext';
import { Todo } from '../../types/Todo';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const { selectedTodo, setSelectedTodo } = useContext(TodosContext);
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    if (selectedTodo) {
      getUser(selectedTodo.userId).then(setUser)
        .finally(() => setIsLoad(false));
    }
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoad ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setSelectedTodo(null as unknown as Todo)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className={classNames({
                'has-text-danger': !selectedTodo?.completed,
                'has-text-success': selectedTodo?.completed,
              })}
              >
                {selectedTodo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
