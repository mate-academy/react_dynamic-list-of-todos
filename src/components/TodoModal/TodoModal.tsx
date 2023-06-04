import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface Props {
  inspectedTodo: Todo,
  setInspectedTodo: (arg0: Todo | null) => void;
}

export const TodoModal: React.FC<Props>
  = ({ inspectedTodo, setInspectedTodo }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userInfo, setUserInfo] = useState<null | User>(null);

    useEffect(() => {
      getUser(inspectedTodo.userId)
        .then(fetchedUser => setUserInfo(fetchedUser))
        .finally(() => setIsLoading(false));
    }, []);

    return (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />

        {isLoading ? (
          <Loader />
        ) : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #2
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => setInspectedTodo(null)}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                quis ut nam facilis et officia qui
              </p>

              <p className="block" data-cy="modal-user">
                {inspectedTodo.completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>}

                {' by '}

                <a href={`mailto:${userInfo?.email}`}>
                  {userInfo?.name}
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };
