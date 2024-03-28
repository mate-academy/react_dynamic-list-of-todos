import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

interface Props {
  selectedTodo: Todo | null,
  setSelectedTodo: (arg: (Todo | null)) => void,
}

export const TodoModal: React.FC<Props> = ({ selectedTodo, setSelectedTodo}) => {
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    getUser(selectedTodo.userId)
      .then(setUser)
      .finally(() => setIsUserLoaded(true));
  })

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!isUserLoaded ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectedTodo.id}
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
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className={cn({"has-text-danger": !selectedTodo.completed, "has-text-success": selectedTodo.completed})}>
                {selectedTodo.completed ? ('Done') : ('Planned')}
              </strong>

              {' by '}
              {}
              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
